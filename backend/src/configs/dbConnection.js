"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
// MongoDB Connection:

const mongoose = require('mongoose')
//const initializeCounters = require('./initializeCounters'); 

const dbConnection = function () {
    // Connect:
    mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() =>{ 
            console.log('* DB Connected * ')
            //require('./initializeCounters')()  // Veritabanı bağlantısı sağlandıktan sonra sayaçları başlat
        })
        .catch((err) => console.log('* DB Not Connected * ', err))
}

/* ------------------------------------------------------- */
module.exports = {
    mongoose,
    dbConnection
} 