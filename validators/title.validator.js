const Joi = require('joi');

const titleValidator = Joi.object({
    title: Joi
        .string()
        .trim()
        .required()
});

module.exports = {
    titleValidator
};
