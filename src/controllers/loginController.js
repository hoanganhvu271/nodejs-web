const connection = require('../config/database')
const bcrypt = require('bcrypt');
const { getAllUsers, getUserById, updateUserById, createNewUser,
    deleteUser } = require('../services/CRUDservices')

const Account = require('../models/Account')
const mailer = require('../utils/mailer')

const getLoginPage = (req, res) => {
    res.render('login.ejs');
}

const login = async (req, res) => {
    const { email, password } = req.body;
    // console.log(email, password)
    if (email && password) {

        const user = await Account.findByEmail(email)


        if (!user) {
            res.redirect('/login');
        } else {
            if (user.email_verified_at) {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (result == true) {
                        req.session.loggedin = true;
                        req.session.user = user;
                        res.redirect('/');
                    } else {
                        // A user with that email address does not exists
                        const conflictError = 'Tài khoản hoặc mật khẩu không chính xác !';
                        res.render('login.ejs', { email, password, conflictError });
                    }
                })
            }
            else {
                const verified_status = 'Email này chưa được xác thực!'
                res.render('login.ejs', { verified_status })
            }
        }


    }
}

register = (req, res) => {
    const { name, email, password } = req.body;

    if (email && password && name) {
        bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND)).then((hashed) => {
            // Create a User
            const account = new Account({
                name: name,
                email: email,
                password: hashed
            });
            Account.createNewAccount(account, (err, account) => {

            })
            bcrypt.hash(account.email, parseInt(process.env.BCRYPT_SALT_ROUND)).then((hashedEmail) => {
                console.log(`${process.env.APP_URL}/verify?email=${account.email}&token=${hashedEmail}`);
                mailer.sendMail(account.email, "Verify Email",
                    `
                <h1> Xác minh email nhé hehe <h1>
                <img src="https://i.pinimg.com/236x/e1/6c/70/e16c704fc0b655e553dd7a1a8a00475d.jpg" > </img>
                <div>
                    <a href="${process.env.APP_URL}/verify?email=${account.email}&token=${hashedEmail}"> Bấm vào đây </a>
                </div>
                
                
                `)
            });
            res.redirect('/login');

        });
    } else {
        const conflictError = 'User credentials are exist.';
        res.render('register', { email, password, name, conflictError });
    }
}

create = (req, res) => {
    res.render('register.ejs');
}

verify = (req, res) => {
    bcrypt.compare(req.query.email, req.query.token, (err, result) => {
        if (result == true) {

            Account.verify(req.query.email, (err, result) => {

            });
            res.render('verify.ejs');
        } else {
            res.redirect('/404');
        }
    })
}

module.exports = {
    getLoginPage,
    register,
    create,
    login,
    verify
    // login, logout
}


