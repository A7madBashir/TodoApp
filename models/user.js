const mongoose = require("mongoose");
const Joi = require("joi");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 25,
  },
});
userSchema.statics.createUser = function (username) {
  return this({
    name: username,
  });
};
const user = mongoose.model("user", userSchema);

function validateuser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(25).required(),
  });

  return schema.validate(user.name, { abortEarly: false });
}

exports.Users = user;
exports.validateuser = validateuser;
