"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/patientAdmission:

const patientAdmission = require('../controllers/patientAdmission')
const permissions = require('../middlewares/permissions')

// URL: /patientAdmissions

//router.use(permissions.isAdmin)

router.route('/')
    .get(patientAdmission.list)
    .post(patientAdmission.create)

router.route('/:id')
    .get(patientAdmission.read)
    .put(patientAdmission.update)
    .patch(patientAdmission.update)
    .delete(patientAdmission.delete)

/* ------------------------------------------------------- */
// Exports:
module.exports = router