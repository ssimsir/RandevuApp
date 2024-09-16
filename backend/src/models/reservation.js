"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
/* ------------------------------------------------------- */
// Product Model:

const ReservationSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    description: {
        type: String,
        trim: true,
        required: true,
    },

    startTime: {
        type: Date,
        default: 0
    },
    
    endTime: {
        type: Date,
        default: 0
    },

    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true,
    },

    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },

}, {
    collection: 'reservation',
    timestamps: true
})

/* ------------------------------------------------------- */
module.exports = mongoose.model('Reservation', ReservationSchema)