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

const ClientSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    name: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },

    surname: {
        type: String,
        trim: true,
    },

    idNumber: {
        type: String,
        trim: true,
    },

    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        index: true
    },

    phophoneNumber: {
        type: String,
        trim: true,
    },

    companyName: {
        type: String,
        trim: true,
    },

    iban: {
        type: String,
        trim: true,
    },
    
    address: {
        type: String,
        trim: true,
    },

    taxNumber: {
        type: String,
        trim: true,
    },

    taxOffice: {
        type: String,
        trim: true,
    },


}, {
    collection: 'client',
    timestamps: true
})

/* ------------------------------------------------------- */
module.exports = mongoose.model('Client', ClientSchema)