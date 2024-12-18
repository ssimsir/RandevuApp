"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/reservation:

const reservation = require('../controllers/reservation')
const permissions = require('../middlewares/permissions')

// URL: /reservation

router.route('/')
    //.get(permissions.isLogin, reservation.list)
    .get(reservation.reservationPatientlist)
    //.post(reservation.create)

router.route('/:id')
    .get(reservation.reservationPatientlist)
    // .put(reservation.update)
    // .patch(reservation.update)
    // .delete(reservation.delete)

/* ------------------------------------------------------- */
// Exports:
module.exports = router