import express from "express";
const route = express.Router();
import { CreateHelp, GetHelps, GetHelpByID, FindHelp, UpdateHelp, DeleteHelp } from "../../controller/Frontend/Help.Controller.js";
import { upload } from "../../Helpers/multer.js";
import { body } from "express-validator";

route.post("/create-help", upload.array("gallery", 5),                                           // Create Help
    body("title", "Title is Required").notEmpty(),
    body("description", "Description is Required").notEmpty(),
    body("help_seeker", "Help_seeker is Required").notEmpty(),
    body("category", "Category is Required").notEmpty(),
    body("location", "Location is Required").notEmpty(),
    body("pincode", "Pincode is Required").notEmpty(),
    body("help_date", "Help_date is Required").notEmpty(),
    CreateHelp);


route.get("/get-help", GetHelps);

route.get("/get-help/:id", GetHelpByID);

route.post("/find-help", FindHelp);                                                       // Find Help By Id



route.post("/update-help/:id", upload.array("gallery", 5),                                // Update Help By Id
    body("title", "Title is Required").notEmpty(),
    body("description", "Description is Required").notEmpty(),
    body("category", "Categoryis Required").notEmpty(),
    body("location", "Location is Required").notEmpty(),
    body("pincode", "Pincode is Required").notEmpty(),
    body("help_date", "Help Date is Required").notEmpty(),
    body("oldImages", "oldImages is Required").notEmpty(),
    UpdateHelp)

route.delete("/delete-help/:id", DeleteHelp);                                                   // Delete Help

export default route;
