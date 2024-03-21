"use strict"


const mongoose = require('mongoose')


const blogCategorySchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: true
    }

}, {
    collection: 'blogCategories',
    timestamps: true
})

const blogPostSchema = new mongoose.Schema({

    // _id

    //Relational Field
    userId: {
        type: mongoose.Schema.ObjectId, // Relational ObjectId
        ref: 'User', // ModelName
        required: true,
    },

    //Relational Field
    blogCategoryId: {
        type: mongoose.Schema.ObjectId, // Relational ObjectId
        ref: 'BlogCategory', // ModelName
        required: true,
    },

    title: {
        type: String,
        trim: true,
        required: true
    },

    content: {
        type: String,
        trim: true,
        required: true
    },

    published: {
        type: Boolean,
        default: true
    },

    // createdAt
    // updatedAt

}, { collection: 'blogPosts', timestamps: true })


module.exports = {
    BlogCategory: mongoose.model('BlogCategory', blogCategorySchema),
    BlogPost: mongoose.model('BlogPost', blogPostSchema)
}