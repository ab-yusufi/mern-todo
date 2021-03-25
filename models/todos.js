const mongoose = require("mongoose");

var todoSchema = new mongoose.Schema({
    todo: {
        type: String,
        trim: true,
        required: true,
    },

    description: {
        type: String,
        trim: true,
        default: "",
    },

    isCompleted: {
        type: Boolean,
        default: false,
    }

})

module.exports = mongoose.model("Todos", todoSchema)