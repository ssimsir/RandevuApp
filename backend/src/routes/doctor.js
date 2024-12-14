"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/doctor:

const doctor = require('../controllers/doctor')
const permissions = require('../middlewares/permissions')

// URL: /doctors

//router.use(permissions.isAdmin)

router.route('/')
    .get(doctor.list)
    .post(doctor.create)

router.route('/:id')
    .get(doctor.read)
    .put(doctor.update)
    .patch(doctor.update)
    .delete(doctor.delete)

/* ------------------------------------------------------- */
// Exports:
module.exports = router