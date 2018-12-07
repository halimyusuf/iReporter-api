
const Joi = require('joi');


function validateUser(user) {
  const schema = {
    firstname: Joi.string().min(2).required(),
    lastname: Joi.string().min(2).required(),
    othernames: Joi.string().min(3).required(),
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    phoneNumber: Joi.string().min(10).required(),
    username: Joi.string().min(3).required(),
    // isAdmin: Joi.boolean().invalid(false).required(),
  };

  return Joi.validate(user, schema);
}

function validateRedflag(redflag) {
  const schema = {
    title: Joi.string().min(3).required(),
    story: Joi.string().min(15).required(),
    location: Joi.string().min(3).required(),
    createdBy: Joi.number().integer().min(1).required(),
  };

  return Joi.validate(redflag, schema);
}

function validateComment(comment) {
  const schema = {
    comment: Joi.string().min(2).required(),
  };

  return Joi.validate(comment, schema);
}

function validateLocation(location) {
  const schema = {
    location: Joi.string().min(2).required(),
  };

  return Joi.validate(location, schema);
}

exports.validate_user = validateUser;
exports.validate_redflag = validateRedflag;
exports.validate_comment = validateComment;
exports.validate_location = validateLocation;
