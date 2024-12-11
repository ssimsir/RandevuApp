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
        ref: 'PatientAdmission',
        required: true,
    },

    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true,
    },

    infoMessage: {
        type: String
    },

    price: {
        type: Number,
        required: true
    },

    discount: {
        type: Number
    },

    discountedPrice: {
        type: Number,
        //set: function() { return this.unitPrice - (this.unitPrice * this.discount) / 100 }, // Data gönderilmediğinde çalışmaz.
        //default: function() { return this.unitPrice - (this.unitPrice * this.discount) / 100 }, // Sadece Create'de çalışır.
        //transform: function() { return this.unitPrice - (this.unitPrice * this.discount) / 100 } // Update yaparken de hesaplasın.
    },
}, {
    collection: 'patientAdmissionService',
    timestamps: true
})

/* ------------------------------------------------------- */
module.exports = mongoose.model('PatientAdmissionService', PatientAdmissionServiceSchema)