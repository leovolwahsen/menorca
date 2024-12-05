import { Request, Response } from "express";
import { attendeeCollections } from "../../config/database";
import { IAttendee } from "../../types/attendees";
import { ObjectId } from "mongodb";

export const createAttendee = async (req: Request, res: Response): Promise<void> => {
    try {
        const newAttendee: IAttendee = req.body;
        const result = await attendeeCollections.insertOne(newAttendee);

        res.status(201).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred" });
    }
}

export const getAllAttendees = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await attendeeCollections.find({}).toArray();

        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred" });
    }
}

export const getAttendeeById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            res.status(400).send({ error: "Invalid ID format" });
            return;
        }

        const query = { _id: new ObjectId(id) };
        const result = await attendeeCollections.findOne(query);

        if (!result) {
            res.status(404).send({ error: "Attendee not found" });
            return;
        }

        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred" });
    }
}

export const getAttendeeByEmail = async (req: Request, res: Response): Promise<void> => {
    try {
        const email = req.params.email;
        const query = { email: email };
        const result = await attendeeCollections.findOne(query);

        if (!result) {
            res.status(404).send({ error: "Attendee not found" });
            return;
        }

        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred" });
    }
}