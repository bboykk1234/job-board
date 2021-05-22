import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import Joi from "joi";
import { EmploymentType } from "../../database/models/EmploymentType";

export const saveJobBodySchema = Joi.object({
    title: Joi.string().required(),
    location: Joi.string().required(),
    employmentTypeId: Joi.number().required(),
    skillIds: Joi.array().items(Joi.number()).min(1).required(),
    description: Joi.string().required(),
    minYearsWorkExp: Joi.number().allow(null).required(),
});

export interface SaveJobRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        title: string,
        location: string,
        employmentTypeId: number,
        skillIds: number[],
        description: string,
        minYearsWorkExp: number | null,
        employmentType?: EmploymentType,
    }
}
