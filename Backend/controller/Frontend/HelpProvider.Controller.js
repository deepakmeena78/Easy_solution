import { Helpers } from "../../Helpers/Helper.js";
import HelpProvider from "../../model/HelpProvider.model.js";
import { Templete } from "../../Utils/templete.js";


// export const GetProvider = async (req, res) => {
//     try {
//         let result = await HelpProvider.find()
//             .populate("help")
//             .populate("help_seeker")
//             .populate("offerd_by");
//         if (!result) {
//             return res.status(404).json({ msg: "No Providers Found" });
//         }
//         return res.status(200).json({ msg: "Providers Fetched Successfully", result });

//     } catch (error) {
//         console.error("Error fetching providers:", error);
//         return res.status(500).json({ msg: "Server Error", error });
//     }
// };


export const HelpRequest = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await HelpProvider.find({ help_seeker: id })
            .populate("help")
            .populate("offerd_by");

        if (!result || result.length === 0) {
            return res.status(404).json({ msg: "No help requests found for this seeker ID." });
        }
        return res.status(200).json({ msg: "Data fetched successfully", result });
    } catch (error) {
        console.error("ERROR:", error);
        return res.status(500).json({ msg: "Server error", error: error.message });
    }
}


export const Create = async (req, res) => {
    try {
        const { help, help_seeker, offerd_by } = req.body;
        console.log(help, help_seeker, offerd_by);

        const existingApplication = await HelpProvider.findOne({ help, offerd_by });

        if (existingApplication) {
            return res.status(400).json({ msg: "You have already applied for this help" });
        }

        let apply = await HelpProvider.create({ help, help_seeker, offerd_by });
        return res.status(201).json({ msg: "Successfully Applied", apply });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "ERROR Help Provider", error });
    }
};




export const Update = async (req, res) => {
    try {
        const { status } = req.body;
        const id = req.params.id

        let helpprovider = await HelpProvider.findById(id)
            .populate("offered_by")
            .populate("help")
            .populate("help_seeker");

        if (!helpprovider) {
            return res.status(404).json({ msg: "User Id Not Exist" });
        }

        helpprovider.status = status;
        await helpprovider.save();

        let data = {
            help_provider: helpprovider.offerd_by.name,
            help_provider_email: helpprovider.offerd_by.email,
            help_seeker_email: helpprovider.help_seeker.email,
            contact: helpprovider.offerd_by.mobile,
            help: helpprovider.help.title,
            help_seeker: helpprovider.help_seeker.name,
            year: new Date().getFullYear(),
            appName: process.env.APP_NAME || "Easy Solution",
            subject: "Status Change Notification"
        };

        let helper = new Helpers();

        if (status == "apply") {
            return res.status(201).json({ msg: "Applied Successfully" });
        }

        else if (status == "accepted") {
            let data = {
                help_provider: helpprovider.offerd_by.name,
                email: helpprovider.offerd_by.email,
                help_seeker_email: helpprovider.help_seeker.email,
                contact: helpprovider.offerd_by.mobile,
                help: helpprovider.help.title,
                help_seeker: helpprovider.help_seeker.name,
                year: new Date().getFullYear(),
                appName: process.env.APP_NAME || "Easy Solution",
                subject: "Request Accepted"
            };
            const templatedata = new Templete().AcceptRequest(data);
            helper.sendMail(data, templatedata);


        } else if (status == "rejected") {
            let data = {
                help_provider: helpprovider.offerd_by.name,
                email: helpprovider.offerd_by.email,
                help_seeker_email: helpprovider.help_seeker.email,
                contact: helpprovider.offerd_by.mobile,
                help: helpprovider.help.title,
                help_seeker: helpprovider.help_seeker.name,
                year: new Date().getFullYear(),
                appName: process.env.APP_NAME || "Easy Solution",
                subject: "Status Change Notification"
            };
            const templatedata = new Templete().RejectRequest(data);
            helper.sendMail(data, templatedata);
        }

        return res.status(201).json({ msg: "Status Change Successfully", data });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "ERROR Update", error });
    }
}