import express from "express";
import * as activitiesController from "./controller"

export const activitiesRouter = express.Router();

activitiesRouter.post("/new-activities", activitiesController.createActivities);
activitiesRouter.get("/activities", activitiesController.getAllActivities);