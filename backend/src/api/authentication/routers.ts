import express from "express";
import { validatePassword } from "./controller";

export const authenticationRouter = express.Router();

authenticationRouter.post("/validate-password", validatePassword);
