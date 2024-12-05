import { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

export const validatePassword = async (req: Request, res: Response): Promise<void> => {
    try {
        const { password } = req.body;
        if (password === process.env.WEBSITE_PASSWORD_VISITORS) {
            res.status(200).send({ message: "Visitors password is correct", role: "visitors" });
        } else if (password === process.env.WEBSITE_PASSWORD_ADMIN) {
            res.status(200).send({ message: "Admin password is correct", role: "admin" });
        } else {
            res.status(401).send({ error: "Invalid visitors-/admin password" });
        }
    } catch (error) {
        console.error("Error validating password: ", error);
        res.status(500).send({ error: "An error occurred" });
    }
};
