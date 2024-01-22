const express = require('express')
const router = express.Router()
const { getHomePage, getBarca, postCreateUser, getCreatePage, getUpdatePage, postUpdateUser
    , postDeleteUser, postHandleRemoveUser } = require('../controllers/homeController')

const { getLoginPage, login, create, register, verify } = require('../controllers/loginController')
const { isAuth, loggedIn } = require("../middleware/auth.middleware")
//router.Method('/route', handler)


//auth
// router.get('/', getHomePage)
// router.get('/login', authMiddleware.isAuth, getLoginPage)
router.get('/login', isAuth, getLoginPage)
router.post('/login', login)

router.get('/register', isAuth, create)
router.post('/register', register)

router.get('/verify', verify)

// .get('/logout', authMiddleware.loggedIn, login.logout)
module.exports = router 
