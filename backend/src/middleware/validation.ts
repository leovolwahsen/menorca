import { Request, Response, NextFunction, RequestHandler } from "express";
import Joi from "joi";

export const validateAttendee = (schema: Joi.ObjectSchema): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            res.status(400).json({
                error: "Validation failed",
                details: error.details.map((detail) => detail.message),
            });
        } else {
            next();
        }
    };
};

export const attendeeValidationSchema = Joi.object({
    willAttend: Joi.string()
        .valid("Yes", "No", "Still unsure")
        .required(),
    firstName: Joi.string()
        .min(1)
        .required(),
    lastName: Joi.string()
        .min(1)
        .required(),
    email: Joi.string()
        .email()
        .required(),
    companion: Joi.object({
        firstName: Joi.string().allow(null, ""),
        lastName: Joi.string().allow(null, ""),
        requireBabysitter: Joi.string().valid(
            "Yes",
            "We will arrange/travel with our own",
            "No, we don't require childcare"
        ),
    }).optional(),
});
