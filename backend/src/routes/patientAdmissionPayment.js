"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/patientAdmissionPayment:

const patientAdmissionPayment = require('../controllers/patientAdmissionPayment')
const permissions = require('../middlewares/permissions')

// URL: /patientAdmissionPayments

//router.use(permissions.isAdmin)

router.route('/')
    .get(patientAdmissionPayment.list)
    .post(patientAdmissionPayment.create)

router.route('/:id')
    .get(patientAdmissionPayment.read)
    .put(patientAdmissionPayment.update)
    .patch(patientAdmissionPayment.update)
    .delete(patientAdmissionPayment.delete)

/* ------------------------------------------------------- */
// Exports:
module.exports = router