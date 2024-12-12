"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/:

// URL: /

// auth:
router.use('/auth', require('./auth'))
// user:
router.use('/users', require('./user'))
// token:
router.use('/tokens', require('./token'))


// brand:
router.use('/brands', require('./brand'))
// category:
router.use('/categories', require('./category'))
// firm:
router.use('/firms', require('./firm'))
// product:
router.use('/products', require('./product'))

// service:
router.use('/services', require('./service'))

// purchase:
router.use('/purchases', require('./purchase'))
// sale:
router.use('/sales', require('./sale'))

// reservation:
router.use('/reservations', require('./reservation'))
router.use('/reservationPatientlists', require('./reservationPatientlist'))


// patient:
router.use('/patients', require('./patient'))

// patientAdmission:
router.use('/patientAdmissions', require('./patientAdmission'))

// patientAdmissionServices:
router.use('/patientAdmissionServices', require('./patientAdmissionService'))

//patinetAdmissionPayment
router.use('/patientAdmissionPayments', require('./patientAdmissionPayment'))


// document:
router.use('/documents', require('./document'))

/* ------------------------------------------------------- */
module.exports = router