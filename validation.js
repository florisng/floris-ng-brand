//Validation
const Joi = require('@hapi/joi');

// Signup validation
const signupValidation = data => {
    const schema = Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        phone: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required().min(6).message('Oops !!! Password must have 6 characters min !!!')
    });
    return schema.validate(data);
}

// Signin validation
const signinValidation = data => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required().min(6).message('Oops !!! Password must have 6 characters min !!!')
    });
    return schema.validate(data);
}

// Article validation
const articleValidation = data => {
    const schema = Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required()
    });
    return schema.validate(data);
}

// Message validation
const questionValidation = data => {
    const schema = Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        phone: Joi.string().required(),
        email: Joi.string().required(),
        question: Joi.string().required()
    });
    return schema.validate(data);
}

module.exports.signupValidation = signupValidation;
module.exports.signinValidation = signinValidation;
module.exports.articleValidation = articleValidation;
module.exports.questionValidation = questionValidation;