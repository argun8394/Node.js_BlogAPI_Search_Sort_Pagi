"use strict"


//*********With Middleware **************/
// Searching & Sorting & Pagination:

module.exports = (req, res, next) => {

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

    // RUN:
    req.getModelList = async (Model, populate = null) => {

        return await Model.find(search).sort(sort).skip(skip).limit(limit).populate(populate)//gelen modele göre bu işlemi çalıştırır

    }

    next()

}