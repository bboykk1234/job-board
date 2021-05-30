import Joi from "joi";

const CreateJobApplicationRequestRules = Joi.object({
    firstName: Joi.string().max(255).required(),
    lastName: Joi.string().max(255).required(),
    email: Joi.string().email().max(255).required(),
    phoneId: Joi.number().required(),
    phoneNumber: Joi.string().max(20).required(),
    address: Joi.string().max(255).required(),
    city: Joi.string().max(30).required(),
    province: Joi.string().max(30).required(),
    postalCode: Joi.string().max(30).required(),
    countryId: Joi.number().required(),
    jobId: Joi.number().required(),
});

export default CreateJobApplicationRequestRules;
