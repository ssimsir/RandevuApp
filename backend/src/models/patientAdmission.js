"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
const Counter = require('./counter'); // Counter modelini import et

/* ------------------------------------------------------- */

const PatientAdmissionSchema = new mongoose.Schema({
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
    admissionDate: {
        type: Date,
        trim: true,
        required: true
    },

    admissionNumber: {
        type: Number,
        trim: true,
        unique: true,
    },

    protocolNumber: {
        type: Number,
        trim: true,
        unique: true,
    },

    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true,
    },

    findings:{
        type: String,
        trim: true,
    },
    diagnoses : {
        type: String,
        trim: true,
    },
    treatments:{
        type: String,
        trim: true,
    },

    totalAmount: {
        type: Number,
        trim: true,
    },
    kdvAmount: {
        type: Number,
        trim: true,
    },
    totalAmountWithKDV: {
        type: Number,
        trim: true,
    },
    totalPayment: {
        type: Number,
        trim: true,
    },


}, {
    collection: 'patientAdmissions',
    timestamps: true
})

// Pre-save hook to increment admissionNumber
PatientAdmissionSchema.pre('save', async function (next) {
    if (!this.isNew) {
        return next(); // Yalnızca yeni belgelerde çalışsın
    }

    try {
        // Counter koleksiyonundan admissionNumber için yeni bir ardışık sayı alın
        const counterAdmissionNumber = await Counter.findOneAndUpdate(
            { name: 'admissionNumber' }, // Sayaç adı
            { $inc: { seq: 1 } },        // seq değerini 1 artır
            { new: true, upsert: true }  // Belge yoksa oluştur
        );
        // Increment edilen sayıyı admissionNumber alanına ata
        this.admissionNumber = counterAdmissionNumber.seq;

        // Counter koleksiyonundan admissionNumber için yeni bir ardışık sayı alın
        const counterProtocolNumber = await Counter.findOneAndUpdate(
            { name: 'protocolNumber' }, // Sayaç adı
            { $inc: { seq: 1 } },        // seq değerini 1 artır
            { new: true, upsert: true }  // Belge yoksa oluştur
        );

        console.log(counterProtocolNumber.seq)
        // Increment edilen sayıyı admissionNumber alanına ata
        this.protocolNumber = counterProtocolNumber.seq;

        next();
    } catch (error) {
        next(error);
    }
});

/* ------------------------------------------------------- */
module.exports = mongoose.model('PatientAdmission', PatientAdmissionSchema)