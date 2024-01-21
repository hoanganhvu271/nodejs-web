const connection = require('../config/database')
const { getAllUsers } = require('../services/CRUDservices')

const getHomePage = async (req, res) => {
    let results = await getAllUsers()
    return res.render('home.ejs', { listUsers: results })
}

const postCreateUser = async (req, res) => {

    let email = req.body.email
    let name = req.body.name
    let city = req.body.city



    let [results, fields] = await connection.query(
        `INSERT INTO Users(email, name, city) 
        VALUES (?, ?, ?)`, [email, name, city],
    );

    // console.log(results)
    res.send('Create Success!!!')
}

const getCreatePage = (req, res) => {
    res.render('create.ejs')
}

const getBarca = (req, res) => {
    res.render('sample.ejs')
}

module.exports = {
    getHomePage,
    getBarca,
    postCreateUser,
    getCreatePage
}