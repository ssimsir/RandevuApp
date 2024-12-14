"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
// Category Controllers:

const PatientAdmission = require('../models/patientAdmission')

module.exports = {

    list: async (req, res) => {
        /*
            #swagger.tags = ["PatientAdmission"]
            #swagger.summary = "List PatientAdmission"
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

        const data = await res.getModelList(PatientAdmission, {}, ['patientId', 'doctorId'])
        // const data = await res.getModelList(PatientAdmission, {}, [
        //     { path: 'categoryId', select: 'name' }
        // ])



        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(PatientAdmission),
            data
        })

    },

    create: async (req, res) => {
        /*
            #swagger.tags = ["PatientAdmission"]
            #swagger.summary = "Create PatientAdmission"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    $ref: "#/definitions/PatientAdmission"
                }
            }
        */

        const data = await PatientAdmission.create(req.body)

        res.status(201).send({
            error: false,
            data
        })
    },

    read: async (req, res) => {
        /*
            #swagger.tags = ["PatientAdmission"]
            #swagger.summary = "Get Single PatientAdmission"
        */

        const data = await PatientAdmission.findOne({ _id: req.params.id })

        res.status(200).send({
            error: false,
            data
        })

    },

    update: async (req, res) => {
        /*
            #swagger.tags = ["PatientAdmission"]
            #swagger.summary = "Update PatientAdmission"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    $ref: "#/definitions/PatientAdmission"
                }
            }
        */

        const data = await PatientAdmission.updateOne({ _id: req.params.id }, req.body, { runValidators: true })

        res.status(202).send({
            error: false,
            data,
            new: await PatientAdmission.findOne({ _id: req.params.id })
        })

    },

    delete: async (req, res) => {
        /*
            #swagger.tags = ["PatientAdmission"]
            #swagger.summary = "Delete PatientAdmission"
        */

        const data = await PatientAdmission.deleteOne({ _id: req.params.id })
    
        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })

    },

}