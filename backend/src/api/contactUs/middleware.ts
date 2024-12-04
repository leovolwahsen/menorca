import { Request, Response, NextFunction, RequestHandler } from "express";
import Joi from "joi";

export const validateContactUs = (schema: Joi.ObjectSchema): RequestHandler => {
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

export const contactUsValidationSchema = Joi.object({
    title: Joi.string().required(),
    primaryContact: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().required(),
        whatsapp: Joi.string().required(),
    }).required(),
    secondaryContact: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().required(),
        whatsapp: Joi.string().required(),
    }).required(),
});