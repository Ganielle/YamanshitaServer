const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const worldsSchema = new mongoose.Schema(
    {
        owner: {
            type: String
        },
        stageone: {
            type: Number
        },
        stagetwo: {
            type: Number
        },
        stagethree: {
            type: Number
        },
        stagefour: {
            type: Number
        },
        stagefive: {
            type: Number
        }
    },
    {
        timestamps: true
    }
)

const Worlds = mongoose.model("Worlds", worldsSchema)
module.exports = Worlds