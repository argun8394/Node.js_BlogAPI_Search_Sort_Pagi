"use strict"

const User = require('./models/userModel')
const { BlogCategory, BlogPost } = require('./models/blogModel')

module.exports = async () => {

    /* User *

    const user = await User.findOne()

    if (user) {
        BlogPost.updateMany({
            "userId": { $exists: false }
        }, {
            "userId": user._id
            // $unset: { "userId": 1 } 
        }).catch(err => console.log(err))
    }

    /* BlogCategory *
    const blogCategory = await BlogCategory.findOne()

    if (blogCategory) {
        BlogPost.updateMany({
            "blogCategoryId": { $exists: false }
        }, {
            "blogCategoryId": blogCategory._id
            // $unset: { "blogCategoryId": 1 } 
        }).catch(err => console.log(err))
    }
    */

    /* Exampla Data */
    // Deleted All Records: //mevcut tüm kayıtları siliyoruz
    await User.deleteMany().then(() => console.log(' - User Deleted All'))
    await BlogCategory.deleteMany().then(() => console.log(' - BlogCategory Deleted All'))
    await BlogPost.deleteMany().then(() => console.log(' - BlogPost Deleted All'))

    // Example User:
    const user = await User.create({
        email: "test@test.com",
        password: "12345678",
        firstName: "Test",
        lastName: "Test"
    })
    // Example Category:
    const blogCategory = await BlogCategory.create({
        name: 'Test Category'
    })
    // Example Posts: //200 tane yeni kayıt oluşturuyoruz
    for (let key in [...Array(200)]) {
        await BlogPost.create({
            userId: user._id,
            blogCategoryId: blogCategory._id,
            title: `test ${key} title`,
            content: `test ${key} content`,
            published: Boolean(key % 2)
        })
    }

    // End:
    console.log('* Synchronized *')
    /* Finished */
}
