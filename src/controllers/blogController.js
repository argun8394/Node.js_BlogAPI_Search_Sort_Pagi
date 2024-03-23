"use strict"

require('express-async-errors')

//Call Model
const { BlogCategory, BlogPost } = require('../models/blogModel')

// BlogCategory  Controller
// ------------------------------------------
module.exports.BlogCategory = {

    list: async (req, res) => {

        // const data = await BlogCategory.find()
        const data = await req.getModelList(BlogCategory)


        res.status(200).send({
            error: false,
            count: data.length,
            result: data
        })
    },

    create: async (req, res) => {

        const data = await BlogCategory.create(req.body)

        res.status(201).send({
            error: false,
            body: req.body,
            result: data,
        })
    },

    read: async (req, res) => {

        // req.params.categoryId
        // const data = await BlogCategory.findById(req.params.categoryId)
        const data = await BlogCategory.findOne({ _id: req.params.categoryId })

        res.status(200).send({
            error: false,
            result: data
        })

    },

    update: async (req, res) => {

        // const data = await BlogCategory.findByIdAndUpdate(req.params.categoryId, req.body, { new: true }) // return new-data
        const data = await BlogCategory.updateOne({ _id: req.params.categoryId }, req.body, { runValidators: true })

        res.status(202).send({
            error: false,
            body: req.body,
            result: data, // update infos
            newData: await BlogCategory.findOne({ _id: req.params.categoryId })
        })

    },

    delete: async (req, res) => {

        const data = await BlogCategory.deleteOne({ _id: req.params.categoryId })

        res.sendStatus((data.deletedCount >= 1) ? 204 : 404)

    },
}

//BlogPost Controller
module.exports.BlogPost = {
    list: async (req, res) => {

        /*  **********without middleware***********

        // Searching & Sorting & Pagination:

        // SEARCHING: URL?search[key1]=value1&search[key2]=value2
        const search = req.query?.search || {}
        // console.log(search)

        for (let key in search) search[key] = { $regex: search[key], $options: 'i' }
        // console.log(search)

        // Cancelled -> SORTING: URL?sort[key1]=1&sort[key2]=-1 (1:ASC, -1:DESC)
        // mongoose=^8.0 -> SORTING: URL?sort[key1]=asc&sort[key2]=desc (asc: A->Z - desc: Z->A)
        const sort = req.query?.sort || {}
        console.log(sort)

        // PAGINATION: URL?page=1&limit=10
        // const limit = req.query?.limit || 20
        // let limit = req.query?.limit || (process.env?.PAGE_SIZE || 20)
        // limit = Number(limit)
        let limit = Number(req.query?.limit)
        limit = limit > 0 ? limit : Number(process.env?.PAGE_SIZE || 20)

        let page = Number(req.query?.page)
        page = (page > 0 ? page : 1) - 1

        let skip = Number(req.query?.skip)
        skip = skip > 0 ? skip : (page * limit)

        // http://127.0.0.1:8000/blog/post?search[title]=10&sort[createdAt]=desc&limit=5&page=2
        const data = await BlogPost.find(search).sort(sort).skip(skip).limit(limit).populate('blogCategoryId')

        res.status(200).send({
            error: false,
            count: data.length,
            result: data
        })

         */

        // console.log(req)

        const data = await req.getModelList(BlogPost, 'blogCategoryId')

        res.status(200).send({
            error: false,
            count: data.length,
            // details: await req.getModelListDetails(BlogPost),
            result: data,
        })




    },

    listCategoryPosts: async (req, res) => {

        const data = await BlogPost.find({ blogCategoryId: req.params.categoryId }).populate('blogCategoryId')

        res.status(200).send({
            error: false,
            count: data.length,
            result: data
        })
    },

    create: async (req, res) => {
        const data = await BlogPost.create(req.body)

        res.status(201).send({
            error: false,
            body: req.body,
            result: data
        })
    },

    read: async (req, res) => {
        //req.params.postId
        //const data = await BlogPost.findById(req.params.postId)
        const data = await BlogPost.findOne({ _id: req.params.postId })

        res.status(200).send({
            error: false,
            result: data,
        })

    },

    update: async (req, res) => {

        // const data = await BlogPost.updateOne( req.params.postId, req.body,{new:true})
        const data = await BlogPost.updateOne({ _id: req.params.postId }, req.body)

        res.status(202).send({
            error: false,
            body: req.body,
            result: data,
            newData: await BlogPost.findOne({ _id: req.params.postId })
        })

    },

    delete: async (req, res) => {

        const data = await BlogPost.deleteOne({ _id: req.params.postId })

        res.sendStatus((data.deletedCount >= 1) ? 204 : 404)

    },
}
