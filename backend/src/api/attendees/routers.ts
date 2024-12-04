import express from "express";
import * as attendeeController from "./controller"
import { attendeeValidationSchema, validateAttendee } from "./middleware"

export const attendeeRouter = express.Router();

attendeeRouter.post("/new-attendee", validateAttendee(attendeeValidationSchema), attendeeController.createAttendee);
attendeeRouter.get("/attendees", attendeeController.getAllAttendees);
attendeeRouter.get("/attendee/id/:id", attendeeController.getAttendeeById);
attendeeRouter.get("/attendee/email/:email", attendeeController.getAttendeeByEmail);