"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/patientAdmissionService:

const patientAdmissionService = require('../controllers/patientAdmissionService')
const permissions = require('../middlewares/permissions')

// URL: /patientAdmissionServices

//router.use(permissions.isAdmin)

router.route('/')
    .get(patientAdmissionService.list)
    .post(patientAdmissionService.create)

router.route('/:id')
    .get(patientAdmissionService.read)
    .put(patientAdmissionService.update)
    .patch(patientAdmissionService.update)
    .delete(patientAdmissionService.delete)

/* ------------------------------------------------------- */
// Exports:
module.exports = router