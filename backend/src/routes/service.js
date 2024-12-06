"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/service:

const service = require('../controllers/service')
const permissions = require('../middlewares/permissions')

// URL: /services

//router.use(permissions.isStaff)

router.route('/')
    .get(service.list)
    .post(service.create)

router.route('/:id')
    .get(service.read)
    .put(service.update)
    .patch(service.update)
    .delete(service.delete)

/* ------------------------------------------------------- */
// Exports:
module.exports = router