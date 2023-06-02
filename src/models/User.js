const { Schema, model } = require('mongoose'),
  userSchema = new Schema(
    {
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
    },
    { timestamps: true }
  );

userSchema.methods.encryptPassword = async function (password) {
  const { genSalt, hash } = require('bcryptjs'),
    salt = await genSalt(12);

  this.password = await hash(password, salt);
};

userSchema.methods.matchPasswords = async function (password, hashedPassword) {
  const { compare } = require('bcryptjs');
  return await compare(password, hashedPassword);
};

const User = model('User', userSchema);

module.exports = User;
