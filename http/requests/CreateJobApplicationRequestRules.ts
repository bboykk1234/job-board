import Joi from "joi";

const CreateJobApplicationRequestRules = Joi.object({
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

export default CreateJobApplicationRequestRules;