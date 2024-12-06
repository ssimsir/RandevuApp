"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/patient:

const patient = require('../controllers/patient')
const permissions = require('../middlewares/permissions')

// URL: /patients

//router.use(permissions.isAdmin)

router.route('/')
    .get(patient.list)
    .post(patient.create)

router.route('/:id')
    .get(patient.read)
    .put(patient.update)
    .patch(patient.update)
    .delete(patient.delete)

/* ------------------------------------------------------- */
// Exports:
module.exports = router