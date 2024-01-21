require('dotenv').config()
const path = require('path')

const express = require('express')
const app = express()


const configViewEngine = require('./config/viewEngine')
const port = process.env.PORT || 8888
const webRoutes = require('./routes/web')

//config templates
configViewEngine(app)


//khai bao route
// '/' is default prefix
app.use('/', webRoutes)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})