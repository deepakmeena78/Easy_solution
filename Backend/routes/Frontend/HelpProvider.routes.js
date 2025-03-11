import express from "express";
const route = express.Router();
import { Create, Update } from "../../controller/Frontend/HelpProvider.Controller.js";

// route.get("/get-provider", GetProvider);         // Get Provider

route.post("/create", Create);                   // Help Apply

route.post("/update/:id", Update);               // Help Apply

export default route;