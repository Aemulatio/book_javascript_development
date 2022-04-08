const mongoose = require("mongoose")
const {tr} = require("faker/lib/locales");

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            index: {unique: true}
        },
        email: {
            type: String,
            required: true,
            index: {unique: true}
        },
        password:{
            type: String,
            required: true,
        },
        avatar: {
            type: String,
        }
    },
    {
        timestamp: true
    }
);

const User = mongoose.model('User', UserSchema);
module.exports = User