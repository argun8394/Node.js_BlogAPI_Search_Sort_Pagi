"use strict"

const express = require("express");
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 8000;


// SessionCookies:
// http://expressjs.com/en/resources/middleware/cookie-session.html
// https://www.npmjs.com/package/cookie-session
//* $ npm i cookie-session
const session = require("cookie-session")

app.use(session({
    secret: process.env.SECRET_KEY || 'secret_keys_for_cookies',
    // name: 'cookie', // default: req.session
    // maxAge: 1000 * 60 * 60 * 24 // 1 day (miliseconds)
}))

app.use(express.json());

// Connect to MongoDB with Mongoose:
require('./src/dbConnection')

// Searching&Sorting&Pagination Middleware:
app.use(require('./src/middlewares/findSearchSortPage'))

//HomePage
app.all('/', (req, res) => {
    res.send('WELL COME TO BLOG API')
})


//Routes
app.use('/user', require('./src/routes/userRoute'))
app.use('/blog', require('./src/routes/blogRoute'))

// Synchronization:
// require('./src/sync')()

//errorHandler
app.use(require('./src/errorHandler'))

app.listen(PORT, () => console.log('Running http://127.0.0.1:' + PORT));
