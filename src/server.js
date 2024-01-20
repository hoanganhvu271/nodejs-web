const express = require('express')
const path = require('path')
const app = express()
const port = 8080

//config templates

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Thiết lập middleware để phục vụ các tệp tĩnh từ thư mục 'assets'
app.use(express.static(path.join(__dirname, '../assets')));




app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/abc', (req, res) => {
    // res.send('<h1> Hello Hahaa </h1>')
    res.render('sample.ejs')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})