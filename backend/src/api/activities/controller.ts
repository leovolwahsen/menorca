import { Request, Response } from "express";
import { activitiesCollections } from "../../config/database";

export const createActivities = async (req: Request, res: Response): Promise<void> => {
    try {
        const newActivities = req.body;
        const result = await activitiesCollections.insertOne(newActivities);

        res.status(201).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred" });
    }
}

export const getAllActivities = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await activitiesCollections.find({}).toArray();

        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred" });
    }
}