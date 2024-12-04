import express from "express";
import * as contactUsController from "./controller"
import { contactUsValidationSchema, validateContactUs } from "./middleware"

export const contactUsRouter = express.Router();

contactUsRouter.post("/new-contact-us", validateContactUs(contactUsValidationSchema), contactUsController.createContactUs);
contactUsRouter.get("/contact-us", contactUsController.getAllContactUs);