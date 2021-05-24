import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import Joi from "joi";
import { EmploymentType } from "../../database/models/EmploymentType";
import { Level } from "../../database/models/Level";

export const saveJobBodySchema = Joi.object({
    title: Joi.string().required(),
    location: Joi.string().required(),
    employmentTypeId: Joi.number().required(),
    levelId: Joi.number().required(),
    jobFunctionId: Joi.number().required(),
    skillIds: Joi.array().items(Joi.number()).min(1).required(),
    description: Joi.string().required(),
});

export interface SaveJobRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        title: string,
        location: string,
        employmentTypeId: number,
        levelId: number,
        jobFunctionId: number,
        skillIds: number[],
        description: string,
    }
}
