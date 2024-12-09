"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
// Category Controllers:
const mongoose = require('mongoose');
const Patient = require('../models/patient')

module.exports = {

    list: async (req, res) => {
        /*
            #swagger.tags = ["Patient"]
            #swagger.summary = "List Patient"
            #swagger.description = `
                You can use <u>filter[] & search[] & sort[] & page & limit</u> queries with endpoint.
                <ul> Examples:
                    <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=asc&sort[field2]=desc</b></li>
                    <li>URL/?<b>limit=10&page=1</b></li>
                </ul>
            `
        */

        const data = await res.getModelList(Patient)

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Patient),
            data
        })

    },

    create: async (req, res) => {
        /*
            #swagger.tags = ["Patient"]
            #swagger.summary = "Create Patient"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    $ref: "#/definitions/Patient"
                }
            }
        */

        const data = await Patient.create(req.body)

        res.status(201).send({
            error: false,
            data
        })
    },

    read: async (req, res) => {
        /*
            #swagger.tags = ["Patient"]
            #swagger.summary = "Get Single Patient"
        */
            const data = await Patient.aggregate([
                { $match: { _id: new mongoose.Types.ObjectId(req.params.id) } }, // ObjectId dönüşümü
                {
                    $lookup: {
                        from: 'patientAdmission', // İlişkili koleksiyon adı
                        localField: '_id',        // Patient._id
                        foreignField: 'patientId', // PatientAdmission.patientId
                        as: 'patientAdmissions'    // Dönen veri için bir ad
                    }
                },
                { $unwind: { path: "$patientAdmissions", preserveNullAndEmptyArrays: true } }, // patientAdmissions'ı aç
                { $sort: { "patientAdmissions.admissionNumber": -1 } }, // Sıralama işlemi
                {
                    $group: {
                        _id: "$_id",
                        name: { $first: "$name" },
                        surname: { $first: "$surname" },
                        gender: { $first: "$gender" },
                        idNumber: { $first: "$idNumber" },
                        email: { $first: "$email" },
                        phoneNumber: { $first: "$phoneNumber" },
                        patientAdmissions: { $push: "$patientAdmissions" } // Sıralanmış admissions'ı yeniden grupla
                    }
                }
            ]);

        res.status(200).send({
            error: false,
            data
        })

    },

    update: async (req, res) => {
        /*
            #swagger.tags = ["Patient"]
            #swagger.summary = "Update Patient"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    $ref: "#/definitions/Patient"
                }
            }
        */

        const data = await Patient.updateOne({ _id: req.params.id }, req.body, { runValidators: true })

        res.status(202).send({
            error: false,
            data,
            new: await Patient.findOne({ _id: req.params.id })
        })

    },

    delete: async (req, res) => {
        /*
            #swagger.tags = ["Patient"]
            #swagger.summary = "Delete Patient"
        */

        const data = await Patient.deleteOne({ _id: req.params.id })
    
        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })

    },

}