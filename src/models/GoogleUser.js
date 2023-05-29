const { Schema, model } = require('mongoose'),
    userSchema = new Schema({
        email: { type: String, required: true, unique: true },
        displayName: { type: String, required: true },
    }, { timestamps: true });

const GoogleUser = model('GoogleUser', userSchema);

module.exports = GoogleUser;