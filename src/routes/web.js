const express = require('express')
const router = express.Router()
const { getHomePage, getBarca, postCreateUser, getCreatePage, getUpdatePage, postUpdateUser
    , postDeleteUser, postHandleRemoveUser, getLoginPage } = require('../controllers/homeController')
const { isAuth, loggedIn } = require("../middleware/auth.middleware")

//router.Method('/route', handler)
router.get('/', loggedIn, getHomePage)
router.get('/barca', getBarca)
router.get('/create', getCreatePage)
router.post('/create-user', postCreateUser)
router.post('/update-user', postUpdateUser)
router.post('/delete-user/:id', postDeleteUser)
router.post('/delete-user', postHandleRemoveUser)
router.get('/update/:id', getUpdatePage)

//auth
// router.get('/login', getLoginPage)

module.exports = router 
