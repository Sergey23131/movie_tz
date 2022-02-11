const Joi = require('joi');

const starValidator = Joi.object({
    star: Joi
        .string()
        .trim()
        .required(),

});

module.exports = {
    starValidator
};
