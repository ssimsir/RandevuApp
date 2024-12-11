"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
// Category Controllers:

const PatientAdmissionService = require('../models/patientAdmissionService')
const PatientAdmission = require('../models/patientAdmission')
const kdvRate = 20

module.exports = {

    list: async (req, res) => {
        /*
            #swagger.tags = ["PatientAdmissionService"]
            #swagger.summary = "List PatientAdmissionService"
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

        //const data = await res.getModelList(PatientAdmissionService, {}, ['patientId'])
        const data = await res.getModelList(PatientAdmissionService, {}, [
            { path: 'serviceId', select: 'name content price' },
        ])



        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(PatientAdmissionService),
            data
        })

    },

    create: async (req, res) => {
        /*
            #swagger.tags = ["PatientAdmissionService"]
            #swagger.summary = "Create PatientAdmissionService"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    $ref: "#/definitions/PatientAdmissionService"
                }
            }
        */

        req.body.discountedPrice = req.body.price - (req.body.price * req.body.discount) / 100;

        const data = await PatientAdmissionService.create(req.body)

        //Kayıt Sonrası patientAdmission Güncelle
        const updatePatientAdmission = await PatientAdmission.updateOne(
            { _id: data.patientAdmissionId }, 
            { $inc: { totalAmount: +data.discountedPrice, kdvAmount: +(data.discountedPrice*kdvRate)/100, totalAmountWithKDV: +(data.discountedPrice+(data.discountedPrice*kdvRate)/100)}}
        )
        res.status(201).send({
            error: false,
            data
        })
    },

    read: async (req, res) => {
        /*
            #swagger.tags = ["PatientAdmissionService"]
            #swagger.summary = "Get Single PatientAdmissionService"
        */

        const data = await PatientAdmissionService.findOne({ _id: req.params.id })

        res.status(200).send({
            error: false,
            data
        })

    },

    update: async (req, res) => {
        /*
            #swagger.tags = ["PatientAdmissionService"]
            #swagger.summary = "Update PatientAdmissionService"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    $ref: "#/definitions/PatientAdmissionService"
                }
            }
        */

        const data = await PatientAdmissionService.updateOne({ _id: req.params.id }, req.body, { runValidators: true })

        res.status(202).send({
            error: false,
            data,
            new: await PatientAdmissionService.findOne({ _id: req.params.id })
        })

    },

    delete: async (req, res) => {
        /*
            #swagger.tags = ["PatientAdmissionService"]
            #swagger.summary = "Delete PatientAdmissionService"
        */

        const data = await PatientAdmissionService.deleteOne({ _id: req.params.id })
    
        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })

    },

}