const connection = require('../config/database')

const Account = function (account) {
    this.name = account.name;
    this.password = account.password;
    this.email = account.email;
};

Account.createNewAccount = async (account) => {
    let [results, fields] = await connection.query(
        `INSERT INTO Account(name, email, password) 
        VALUES (?, ?, ?)`, [account.name, account.email, account.password],
    );
}

Account.findByEmail = async (email) => {
    let [results, fields] = await connection.query('select * from Account where email = ?', [email])


    let user = results && results.length > 0 ? results[0] : {}
    // console.log(user)
    return user
}

Account.verify = (email, result) => {
    connection.query(
        "UPDATE Account SET email_verified_at = ? WHERE email = ?",
        [true, email]
    );
}

module.exports = Account;