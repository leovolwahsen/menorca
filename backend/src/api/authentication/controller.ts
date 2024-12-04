import { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

export const validatePassword = async (req: Request, res: Response): Promise<void> => {
    try {
        const { password } = req.body;
        if (password === process.env.WEBSITE_PASSWORD) {
            res.status(200).send({ message: "Password is correct" });
        } else {
            res.status(401).send({ error: "Invalid password" });
        }
    } catch (error) {
        console.error("Error validating password: ", error);
        res.status(500).send({ error: "An error occurred" });
    }
};
