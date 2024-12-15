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

    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true,
    },

    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true,
    },

}, {
    collection: 'reservations',
    timestamps: true
})

/* ------------------------------------------------------- */
module.exports = mongoose.model('Reservation', ReservationSchema)