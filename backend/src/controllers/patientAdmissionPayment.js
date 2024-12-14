"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
// Category Controllers:

const PatientAdmissionPayment = require('../models/patientAdmissionPayment')

module.exports = {

    list: async (req, res) => {
        /*
            #swagger.tags = ["PatientAdmissionPayment"]
            #swagger.summary = "List PatientAdmissionPayment"
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

        //const data = await res.getModelList(PatientAdmissionPayment, {}, ['patientId'])
        const data = await res.getModelList(PatientAdmissionPayment, {}, [
            //{ path: 'serviceId', select: 'name content price' },
        ])



        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(PatientAdmissionPayment),
            data
        })

    },

    create: async (req, res) => {
        /*
            #swagger.tags = ["PatientAdmissionPayment"]
            #swagger.summary = "Create PatientAdmissionPayment"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    $ref: "#/definitions/PatientAdmissionPayment"
                }
            }
        */

        const data = await PatientAdmissionPayment.create(req.body)

        res.status(201).send({
            error: false,
            data
        })
    },

    read: async (req, res) => {
        /*
            #swagger.tags = ["PatientAdmissionPayment"]
            #swagger.summary = "Get Single PatientAdmissionPayment"
        */

        const data = await PatientAdmissionPayment.findOne({ _id: req.params.id })

        res.status(200).send({
            error: false,
            data
        })

    },

    update: async (req, res) => {
        /*
            #swagger.tags = ["PatientAdmissionPayment"]
            #swagger.summary = "Update PatientAdmissionPayment"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    $ref: "#/definitions/PatientAdmissionPayment"
                }
            }
        */

        const data = await PatientAdmissionPayment.updateOne({ _id: req.params.id }, req.body, { runValidators: true })

        res.status(202).send({
            error: false,
            data,
            new: await PatientAdmissionPayment.findOne({ _id: req.params.id })
        })

    },

    delete: async (req, res) => {
        /*
            #swagger.tags = ["PatientAdmissionPayment"]
            #swagger.summary = "Delete PatientAdmissionPayment"
        */

        const data = await PatientAdmissionPayment.deleteOne({ _id: req.params.id })
    
        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })

    },

}