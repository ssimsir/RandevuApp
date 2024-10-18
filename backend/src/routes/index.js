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


// client:
router.use('/clients', require('./client'))

// document:
router.use('/documents', require('./document'))

/* ------------------------------------------------------- */
module.exports = router