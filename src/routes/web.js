const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Hello World!')
})

router.get('/barca', (req, res) => {
    // res.send('<h1> Hello Hahaa </h1>')
    res.render('sample.ejs')
})


module.exports = router 
