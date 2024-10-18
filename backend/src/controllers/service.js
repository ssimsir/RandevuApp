"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
// Service Controllers:

const Service = require('../models/service')

module.exports = {

    list: async (req, res) => {
        /*
            #swagger.tags = ["Services"]
            #swagger.summary = "List Services"
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

        // const data = await res.getModelList(Service, {}, ['categoryId', 'brandId'])
        const data = await res.getModelList(Service)

        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Service),
            data
        })

    },

    create: async (req, res) => {
        /*
            #swagger.tags = ["Services"]
            #swagger.summary = "Create Service"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    $ref: "#/definitions/Service"
                }
            }
        */

        const data = await Service.create(req.body)

        res.status(201).send({
            error: false,
            data
        })
    },

    read: async (req, res) => {
        /*
            #swagger.tags = ["Services"]
            #swagger.summary = "Get Single Service"
        */

        const data = await Service.findOne({ _id: req.params.id }).populate([
            { path: 'categoryId', select: 'name' },
            { path: 'brandId', select: 'name' },
        ])

        res.status(200).send({
            error: false,
            data
        })

    },

    update: async (req, res) => {
        /*
            #swagger.tags = ["Services"]
            #swagger.summary = "Update Service"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    $ref: "#/definitions/Service"
                }
            }
        */

        const data = await Service.updateOne({ _id: req.params.id }, req.body, { runValidators: true })

        res.status(202).send({
            error: false,
            data,
            new: await Service.findOne({ _id: req.params.id })
        })

    },

    delete: async (req, res) => {
        /*
            #swagger.tags = ["Services"]
            #swagger.summary = "Delete Service"
        */

        const data = await Service.deleteOne({ _id: req.params.id })
    
        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })

    },

}