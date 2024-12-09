"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
const Counter = require('./counter'); // Counter modelini import et

/* ------------------------------------------------------- */

const PatientAdmissionServiceSchema = new mongoose.Schema({
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
        ref: 'patientAdmission',
        required: true,
    },

    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'service',
        required: true,
    },


}, {
    collection: 'patientAdmissionService',
    timestamps: true
})

/* ------------------------------------------------------- */
module.exports = mongoose.model('PatientAdmissionService', PatientAdmissionServiceSchema)