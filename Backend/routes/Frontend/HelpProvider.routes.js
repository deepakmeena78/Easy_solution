import express from "express";
const route = express.Router();
import { Create, Update, HelpRequest } from "../../controller/Frontend/HelpProvider.Controller.js";

// route.get("/get-provider", GetProvider);         // Get Provider

route.get("/help-request/:id", HelpRequest);           // Help Request Notifications

route.post("/create", Create);                   // Help Apply

route.post("/update/:id", Update);               // Help Apply

export default route;