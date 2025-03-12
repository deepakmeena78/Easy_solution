import mongoose from "mongoose";
import path from "path";
import HelpModule from "../../model/Help.model.js";
import fs from "fs";
import { fileURLToPath } from "url";  // Import fileURLToPath
import { validationResult } from "express-validator";

// Manually define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const CreateHelp = async (req, res) => {                               // Create Help 
    try {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description, help_seeker, category, location, pincode, status, help_date } = req.body;
        const gallery = req.files.map(file => file.path);

        const result = await HelpModule.create({ title, description, help_seeker, category, location, pincode, gallery, status, help_date });

        if (result) {
            return res.status(200).json({ msg: "Help Created Successfully", result });
        }
        return res.status(400).json({ msg: "Invalid Data. Help creation failed." });
    } catch (error) {
        console.error("CREATE HELP ERROR:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }// ====================== Help Create ==============================
};



export const FindHelp = async (req, res) => {                                    // Help Find BY Id 
    try {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { id } = req.body;
        const user = await HelpModule.findById(id);
        if (user) {
            return res.status(201).json({ msg: "You Can Change Help ", user })
        }
        return res.status(401).json({ msg: "Id Help Not Exist " });
    } catch (error) {
        return res.status(500).json({ msg: "ERROR FIND HELP", error });
    }//==================== Find Help =================================
}



export const UpdateHelp = async (req, res) => {
    try {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const id = req.params.id;
        let { title, description, category, location, pincode, help_date, oldImages } = req.body;

        console.log("Received oldImages:", oldImages);

        // ✅ **Convert oldImages from string to array & Fix Path Slashes**
        if (typeof oldImages === "string") {
            try {
                oldImages = JSON.parse(oldImages); // Convert to array
            } catch (err) {
                oldImages = [oldImages]; // If JSON parsing fails, store as array
            }
        }
        oldImages = oldImages.map(img => img.replace(/\\/g, "/")); // ✅ Convert `\` to `/`
        oldImages = oldImages || [];

        // ✅ **New images array**
        const newImages = req.files ? req.files.map(file => `uploads/${file.filename}`) : [];

        // 🔹 **Check if the provided ID is valid**
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid ID" });
        }

        // 🔹 **Fetch the existing help item**
        let helpItem = await HelpModule.findById(id);
        if (!helpItem) {
            return res.status(404).json({ error: "Data not found" });
        }

        // 🔥 **Step 1: Delete Old Images from Uploads Folder**
        const deleteImage = (imagePath) => {
            const filePath = path.resolve(__dirname, "..", imagePath);
            console.log("Attempting to delete:", filePath);

            if (fs.existsSync(filePath)) {
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error("Error deleting file:", filePath, err);
                    } else {
                        console.log("Deleted:", filePath);
                    }
                });
            } else {
                console.log("File not found, skipping:", filePath);
            }
        };

        helpItem.gallery.forEach(img => {
            if (!oldImages.includes(img)) {
                deleteImage(img);
            }
        });

        // 🔥 **Step 2: Update Database with New Images**
        helpItem.set({
            title,
            description,
            category,
            location,
            pincode,
            help_date,
            gallery: newImages // Store only new images
        });

        await helpItem.save();
        return res.status(200).json({ msg: "Updated Successfully", helpItem });

    } catch (error) {
        console.error("ERROR:", error);
        return res.status(500).json({ msg: "ERROR Updating Help", error });
    }
};



export const GetHelps = async (req, res) => {
    try {
        let result = await HelpModule.find({});
        if (!result) {
            return res.status(404).json({ Err: "Data Is Not available" });
        }
        return res.status(200).json({ msg: "Data Get Successfully : ", result });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error Get Data ", error });
    }
}



export const GetHelpBySeekerID = async (req, res) => {
    try {
        const help_seeker = req.params.seekerId;

        const result = await HelpModule.find({ help_seeker })
            .populate("category") // Populate category field
            .exec(); // Execute the query

        if (result.length === 0) {
            return res.status(404).json({ error: "No help requests found" });
        }

        return res.status(200).json({ message: "Data fetched successfully", result });
    } catch (error) {
        console.error("Error fetching data:", error);
        return res.status(500).json({ message: "Error fetching data", error });
    }
};




export const DeleteHelp = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await HelpModule.findByIdAndDelete(id, { new: true });
        console.log(result);

        if (!result) {
            return res.status(404).json({ msg: "Invalid Id" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Delete Help ERROR" });
    }
}

