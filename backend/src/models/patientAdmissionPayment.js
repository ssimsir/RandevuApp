"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
const Counter = require('./counter'); // Counter modelini import et

/* ------------------------------------------------------- */

const PatientAdmissionPaymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true,
    },

    patientAdmissionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PatientAdmission',
        required: true,
    },

    paymentAmount: {
        type: Number,
        required: true
    },

    infoMessage: {
        type: String
    }
    
}, {
    collection: 'patientAdmissionPayments',
    timestamps: true
})

/* ------------------------------------------------------- */
module.exports = mongoose.model('PatientAdmissionPayment', PatientAdmissionPaymentSchema)