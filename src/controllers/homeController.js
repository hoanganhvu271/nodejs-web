const connection = require('../config/database')
const { getAllUsers, getUserById, updateUserById, createNewUser,
    deleteUser } = require('../services/CRUDservices')

const getHomePage = async (req, res) => {
    let results = await getAllUsers()
    return res.render('home.ejs', { listUsers: results })
}

const postCreateUser = async (req, res) => {

    let email = req.body.email
    let name = req.body.name
    let city = req.body.city

    await createNewUser(email, name, city)

    // console.log(results)
    res.send('Create Success!!!')
}

const getCreatePage = (req, res) => {
    res.render('create.ejs')
}

const getBarca = (req, res) => {
    res.render('sample.ejs')
}

const getUpdatePage = async (req, res) => {
    const userId = req.params.id
    let user = await getUserById(userId)
    res.render('edit.ejs', { user: user })
}

const postUpdateUser = async (req, res) => {

    let email = req.body.email
    let name = req.body.name
    let city = req.body.city
    let userId = req.body.userId

    await updateUserById(email, name, city, userId)

    res.redirect('/')

}

const postDeleteUser = async (req, res) => {
    const userId = req.params.id
    let user = await getUserById(userId)
    res.render('delete.ejs', { user: user })

}

const postHandleRemoveUser = async (req, res) => {

    const userId = req.body.userId
    await deleteUser(userId)

    res.redirect('/')
}


module.exports = {
    getHomePage,
    getBarca,
    postCreateUser,
    getCreatePage,
    getUpdatePage,
    postUpdateUser,
    postDeleteUser,
    postHandleRemoveUser,
}