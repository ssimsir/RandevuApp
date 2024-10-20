"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
/* ------------------------------------------------------- */
// Product Model:

const ServiceSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    name: {
        type: String,
        trim: true,
        required: true,
    },

    content: {
        type: String,
        trim: true,
    },

    code: {
        type: Number,
        trim: true,
    },

    price: {
        type: Number,
        default: 0
    },

    color: {
        type: String,
        trim: true,
    }

}, {
    collection: 'services',
    timestamps: true
})

/* ------------------------------------------------------- */
module.exports = mongoose.model('Service', ServiceSchema)