"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
// Firm Controllers:

const Reservation= require('../models/reservation')

module.exports = {

    list: async (req, res) => {
        /*
            #swagger.tags = ["Reservation"]
            #swagger.summary = "List Reservation"
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

        //yetkisine göre revervasyonlara erişim ver
        let customFilter = {};
        //if (!req.user.isAdmin && !req.user.isStaff) {
        //    customFilter = { userId: req.user.id };
        //}
        const data = await res.getModelList(Reservation, customFilter, [
            { path: "serviceId", select: "color" },
            { path: "clientId", select: "name surname" }

            
          ])

          const modifiedData = data.map(reservation => ({
            id: reservation._id,  // _id'yi reservationId olarak değiştiriyoruz
            title:  reservation.clientId.name + " " + reservation.clientId.surname, //+ " " + reservation.description,

            start: reservation.startTime,
            end: reservation.endTime,

            backgroundColor : reservation.serviceId.color,
            borderColor :  reservation.serviceId.color,

        }));


        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Reservation),
            data:modifiedData
        })

    },

    reservationPatientlist: async (req, res) => {
        /*
            #swagger.tags = ["Reservation"]
            #swagger.summary = "List Reservation"
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

        //yetkisine göre revervasyonlara erişim ver
        let customFilter = {};
        //if (!req.user.isAdmin && !req.user.isStaff) {
        //    customFilter = { userId: req.user.id };
        //}
        const data = await res.getModelList(Reservation, customFilter, [
            { path: "serviceId", select: "name price color" },
            { path: "clientId", select: "name surname idNumber email phoneNumber" }            
          ])

          const modifiedData = data.map(reservation => ({
            reservationId: reservation._id,  // _id'yi reservationId olarak değiştiriyoruz
            description: reservation.description,
            startTime: reservation.startTime,
            endTime: reservation.endTime,
            patientName : reservation.clientId.name,
            patientSurname : reservation.clientId.surname,
            patientIdNumber : reservation.clientId.idNumber,
            patientEmail : reservation.clientId.email,
            patientPhoneNumber : reservation.clientId.phoneNumber,
            serviceName : reservation.serviceId.name,
            servicePrice : reservation.serviceId.price,
            serviceColor : reservation.serviceId.color
        }));


        res.status(200).send({
            error: false,
            details: await res.getModelListDetails(Reservation),
            data:modifiedData
        })

    },

    create: async (req, res) => {
        /*
            #swagger.tags = ["Reservation"]
            #swagger.summary = "Create Reservation"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    $ref: "#/definitions/Reservation"
                }
            }
        */

        const data = await Reservation.create(req.body)

        res.status(201).send({
            error: false,
            data
        })
    },

    read: async (req, res) => {
        /*
            #swagger.tags = ["Reservation"]
            #swagger.summary = "Get Single Reservation"
        */

        const data = await Reservation.findOne({ _id: req.params.id })

        res.status(200).send({
            error: false,
            data
        })

    },

    update: async (req, res) => {
        /*
            #swagger.tags = ["Reservation"]
            #swagger.summary = "Update Reservation"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    $ref: "#/definitions/Reservation"
                }
            }
        */

        const data = await Reservation.updateOne({ _id: req.params.id }, req.body, { runValidators: true })

        res.status(202).send({
            error: false,
            data,
            new: await Reservation.findOne({ _id: req.params.id })
        })

    },

    delete: async (req, res) => {
        /*
            #swagger.tags = ["Reservation"]
            #swagger.summary = "Delete Reservation"
        */

        const data = await Reservation.deleteOne({ _id: req.params.id })
    
        res.status(data.deletedCount ? 204 : 404).send({
            error: !data.deletedCount,
            data
        })

    },

}