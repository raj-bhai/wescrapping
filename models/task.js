const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true,
        // default: "",
    },
    channelName: {
        type: String,
        required: true,
        // default: "",
    },
    completed: {
        type: Boolean,
        required: false,
        default: false,
    },
    clientType: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Task', TaskSchema);