"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/client:

const client = require('../controllers/client')
const permissions = require('../middlewares/permissions')

// URL: /clients

//router.use(permissions.isAdmin)

router.route('/')
    .get(client.list)
    .post(client.create)

router.route('/:id')
    .get(client.read)
    .put(client.update)
    .patch(client.update)
    .delete(client.delete)

/* ------------------------------------------------------- */
// Exports:
module.exports = router