"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
// Category Controllers:
const mongoose = require('mongoose');
const Doctor = require('../models/doctor')

module.exports = {

    list: async (req, res) => {
        /*
            #swagger.tags = ["Doctor"]
            #swagger.summary = "List Doctor"
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

        const data = await res.getModelList(Doctor)


        const currentDate = new Date();
        const updatedData = data.map((doctor) => {
            // Doctor nesnesini düz bir JavaScript nesnesine dönüştür
            const doctorObj = doctor.toObject();
        
            const birthDate = new Date(doctorObj.birthDate); // Doğum tarihini Date objesine çevir
            const age = currentDate.getFullYear() - birthDate.getFullYear();
        
            // Doğum gününe göre düzeltme yap
            const isBeforeBirthdayThisYear =
                currentDate.getMonth() < birthDate.getMonth() ||
                (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate());
        
            const correctedAge = isBeforeBirthdayThisYear ? age - 1 : age;
        
            // Yaş bilgisini ekle
            return {
                ...doctorObj, // Yalnızca gerekli veriler
                age: correctedAge
            };
        });



        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Doctor),
            data:updatedData
        })

    },

    create: async (req, res) => {
        /*
            #swagger.tags = ["Doctor"]
            #swagger.summary = "Create Doctor"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    $ref: "#/definitions/Doctor"
                }
            }
        */

        const data = await Doctor.create(req.body)

        res.status(201).send({
            error: false,
            data
        })
    },

    read: async (req, res) => {
        /*
            #swagger.tags = ["Doctor"]
            #swagger.summary = "Get Single Doctor"
        */


        const data = await Doctor.findOne({ _id: req.params.id })
            
        res.status(200).send({
            error: false,
            data
        })

    },

    update: async (req, res) => {
        /*
            #swagger.tags = ["Doctor"]
            #swagger.summary = "Update Doctor"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    $ref: "#/definitions/Doctor"
                }
            }
        */

        const data = await Doctor.updateOne({ _id: req.params.id }, req.body, { runValidators: true })

        res.status(202).send({
            error: false,
            data,
            new: await Doctor.findOne({ _id: req.params.id })
        })

    },

    delete: async (req, res) => {
        /*
            #swagger.tags = ["Doctor"]
            #swagger.summary = "Delete Doctor"
        */

        const data = await Doctor.deleteOne({ _id: req.params.id })

        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })

    },

}