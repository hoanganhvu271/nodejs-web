require('dotenv').config()
const path = require('path')
const express = require('express')
const app = express()
const session = require('express-session')

const configViewEngine = require('./config/viewEngine')
const port = process.env.PORT || 8888
const webRoutes = require('./routes/web')
const loginRoutes = require('./routes/auth.route')
const connection = require('./config/database')

app.use(session({

    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
}))


//config req body
app.use(express.json()) // for json
app.use(express.urlencoded({ extended: true })) // for form data

//config templates
configViewEngine(app)


//khai bao route, '/' is default prefix


app.use('/', webRoutes)
app.use('/', loginRoutes)
//express-session




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})