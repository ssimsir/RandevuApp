"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
/* ------------------------------------------------------- *
{
    "name": "Firm -1"
}
/* ------------------------------------------------------- */
// Firm Model:

const DoctorSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    idNumber: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        index: true
    },

    name: {
        type: String,
        trim: true,
        required: true,
    },

    surname: {
        type: String,
        trim: true,
        required: true,
    },

    birthDate: {
        type:Date,
        trim: true,
        required: true
    },

    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true,
    },

    email: {
        type: String,
        trim: true,
    },

    gsmNumber: {
        type: String,
        trim: true,
        required: true,
    },
    
    address: {
        type: String,
        trim: true,
    },

    infoMessage: {
        type: String,
        trim: true,
    },
}, {
    collection: 'doctors',
    timestamps: true
})

/* ------------------------------------------------------- */
module.exports = mongoose.model('Doctor', DoctorSchema)