"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
/* ------------------------------------------------------- */
// Product Model:

const ProductSchema = new mongoose.Schema({

    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        //required: true,
    },

    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        //required: true,
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    name: {
        type: String,
        trim: true,
        required: true,
    },

    content: {
        type: String,
        trim: true,
    },

    code: {
        type: String,
        trim: true,
    },

    barcode: {
        type: String,
        trim: true,
    },

    quantity: {
        type: Number,
        default: 0
    },

    price: {
        type: Number,
        default: 0
    },

    color: {
        type: String,
        trim: true,
    },

}, {
    collection: 'products',
    timestamps: true
})

/* ------------------------------------------------------- */
module.exports = mongoose.model('Product', ProductSchema)