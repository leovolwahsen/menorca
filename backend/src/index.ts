import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDatabase } from "./config/database";
import { attendeeRouter } from "./api/attendees/routers";
import { authenticationRouter } from "./api/authentication/routers";
import { contactUsRouter } from "./api/contactUs/routers";
import { activitiesRouter } from "./api/activities/routers";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 4000;

//Middleware
app.use(cors());
app.use(express.json());

// Initiate MongoDB connection
connectToDatabase().then(() => {
    console.log("Database connected successfully");
    
    // Register routes
    app.use("/", attendeeRouter);
    app.use("/", authenticationRouter);
    app.use("/", contactUsRouter);
    app.use("/", activitiesRouter);

    app.get("/", (req: Request, res: Response) => {
        res.send("Welcome to the backend server of menorca!");
    });

    // Start server
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch((error) => {
    console.error(`Failed to connect to database: ${error}`);
});