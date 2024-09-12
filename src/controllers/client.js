"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
// Category Controllers:

const Client = require('../models/client')

module.exports = {

    list: async (req, res) => {
        /*
            #swagger.tags = ["Client"]
            #swagger.summary = "List Client"
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

        const data = await res.getModelList(Client)

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Client),
            data
        })

    },

    create: async (req, res) => {
        /*
            #swagger.tags = ["Client"]
            #swagger.summary = "Create Client"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    $ref: "#/definitions/Client"
                }
            }
        */

        const data = await Client.create(req.body)

        res.status(201).send({
            error: false,
            data
        })
    },

    read: async (req, res) => {
        /*
            #swagger.tags = ["Client"]
            #swagger.summary = "Get Single Client"
        */

        const data = await Client.findOne({ _id: req.params.id })

        res.status(200).send({
            error: false,
            data
        })

    },

    update: async (req, res) => {
        /*
            #swagger.tags = ["Client"]
            #swagger.summary = "Update Client"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    $ref: "#/definitions/Client"
                }
            }
        */

        const data = await Client.updateOne({ _id: req.params.id }, req.body, { runValidators: true })

        res.status(202).send({
            error: false,
            data,
            new: await Client.findOne({ _id: req.params.id })
        })

    },

    delete: async (req, res) => {
        /*
            #swagger.tags = ["Client"]
            #swagger.summary = "Delete Client"
        */

        const data = await Client.deleteOne({ _id: req.params.id })
    
        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })

    },

}