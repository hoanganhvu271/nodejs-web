const loggedIn = (req, res, next) => {

    if (req.session.loggedin) {
        res.locals.user = req.session.user
        next();
    } else {
        res.redirect('/login')
    }
}

const isAuth = (req, res, next) => {
    // console.log(typeof req.session.loggedin)
    if (req.session.loggedin) {
        res.locals.user = req.session.user
        res.redirect('/');
    } else {
        next();
    }
}

module.exports = {
    loggedIn, isAuth
}

