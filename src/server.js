require('dotenv').config()
const path = require('path')
const express = require('express')
const app = express()


const configViewEngine = require('./config/viewEngine')
const port = process.env.PORT || 8888
const webRoutes = require('./routes/web')
const connection = require('./config/database')


//config req body
app.use(express.json()) // for json
app.use(express.urlencoded({ extended: true })) // for form data

//config templates
configViewEngine(app)


//khai bao route, '/' is default prefix
app.use('/', webRoutes)




// connection.query(
//     'select * from Users',
//     function (err, results, fields) {
//         console.log(results)

//     }
// )

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})