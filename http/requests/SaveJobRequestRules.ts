import Joi from "joi";

const SaveJobRequestRules = Joi.object({
    title: Joi.string().required(),
    location: Joi.string().required(),
    companyId: Joi.number().required(),
    employmentTypeId: Joi.number().required(),
    levelId: Joi.number().required(),
    jobFunctionId: Joi.number().required(),
    skillIds: Joi.array().items(Joi.number()).min(1).required(),
    description: Joi.string().required(),
});

export default SaveJobRequestRules;