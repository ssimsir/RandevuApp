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
        type:Date,
        trim: true,
        required: true
    },

    admissionNumber:  {
        type:Number,
        trim: true,
        required: true,
        unique: true,
    },

    examinationType: {
        type: String,
        enum: ['general', 'emergency', 'specialist'],  // Geçerli değerler
        required: true,
    }

}, {
    collection: 'patientAdmission',
    timestamps: true
})

// // Pre-save hook to increment admissionNumber
// PatientAdmissionSchema.pre('save', async function (next) {
//     if (!this.isNew) {
//         return next(); // Yalnızca yeni belgelerde çalışsın
//     }

//     try {
//         // Counter koleksiyonundan admissionNumber için yeni bir ardışık sayı alın
//         const counter = await Counter.findOneAndUpdate(
//             { name: 'admissionNumber' }, // Sayaç adı
//             { $inc: { seq: 1 } },        // seq değerini 1 artır
//             { new: true, upsert: true }  // Belge yoksa oluştur
//         );

//         // Increment edilen sayıyı admissionNumber alanına ata
//         this.admissionNumber = counter.seq;
//         next();
//     } catch (error) {
//         next(error);
//     }
// });

/* ------------------------------------------------------- */
module.exports = mongoose.model('PatientAdmission', PatientAdmissionSchema)