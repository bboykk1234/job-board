import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import Joi from "joi";

export const postJobApplicationBodySchema = Joi.object({
    firstName: Joi.string().max(255).required(),
    lastName: Joi.string().max(255).required(),
    email: Joi.string().email().max(255).required(),
    phoneNumber: Joi.string().max(20).required(),
    address: Joi.string().max(255).required(),
    city: Joi.string().max(30).required(),
    province: Joi.string().max(30).required(),
    postalCode: Joi.string().max(30).required(),
    country: Joi.string().max(50).required(),
    jobId: Joi.number().required(),
});

export interface PostJobApplicationRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        firstName: string,
        lastName: string,
        email: string,
        phoneNumber: string,
        address: string,
        city: string,
        province: string,
        postalCode: string,
        country: string,
        jobId: number,
    }
}
