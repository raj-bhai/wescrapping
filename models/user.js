const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
       // default: "",
    },
    email: {
        type: String,
        required: true,
       // default: "",
    },
    isAdmin: {
        type: Boolean,
        required: true,
       // default: false,
    }
});

module.exports = mongoose.model('User', userSchema);