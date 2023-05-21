const { Schema, model } = require('mongoose'),
    userSchema = new Schema({
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    }, { timestamps: true });

userSchema.methods.encryptPassword = async function (password) {
    const { genSalt, hash } = require('bcryptjs');

    const salt = await genSalt(12);

    this.password = await hash(password, salt);
}

User = model('User', userSchema);

module.exports = User;