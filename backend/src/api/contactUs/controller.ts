import { Request, Response } from "express";
import { contactUsCollections } from "../../config/database";
import { ContactUs } from "../../types/contactUs"

export const createContactUs = async (req: Request, res: Response): Promise<void> => {
    try {
        const newContactUsData: ContactUs = req.body;
        const result = await contactUsCollections.updateOne(
            {},
            { $set: newContactUsData },
            { upsert: true }
        );

        res.status(200).send({ message: "Contact-us information saved successfully", result });
    } catch (error) {
        console.error("Error saving contact-us information:", error);
        res.status(500).send({ error: "An error occurred while saving contact-us information" });
    }
};

export const getAllContactUs = async (req: Request, res: Response): Promise<void> => {
    try {
        const contactUsInfo = await contactUsCollections.findOne({});

        if (!contactUsInfo) {
            res.status(404).send({ message: "No contact-us information found" });
            return;
        }

        res.status(200).send(contactUsInfo);
    } catch (error) {
        console.error("Error retrieving contact-us information:", error);
        res.status(500).send({ error: "An error occurred while retrieving contact-us information" });
    }
};
