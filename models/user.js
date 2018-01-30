const bcrypt = require('bcryptjs');

const db = require("../db/index.js")

const userObject = {};

userObject.create = function create(user) {
    const passwordDigest = bcrypt.hashSync(user.password, 10);
    return db.oneOrNone(
        'INSERT INTO users (email, password_digest, counter) VALUES ($1, $2, $3) RETURNING *;', [user.email, passwordDigest, 0]    
    );
};

userObject.findByEmail = function findByEmail(email) {
    return db.oneOrNone('SELECT * FROM users WHERE email = $1;', [email]);
};

userObject.findByEmailMiddleware = function findByEmailMiddleware(req, res, next) {
    const email = req.user.email;
    userObject
        .findByEmail(email)
        .then((userData) => {
            res.locals.userData = userData;
            next();
        }).catch(err => console.log('ERROR:', err));
};        

userObject.incrementCounter = function incrementCounter (req, res, next) {
    db.one(
        'UPDATE users SET counter = counter + 1 WHERE email = $1 RETURNING counter', [req.user.email]
    ).then((counterData) => {
        res.locals.counterData = counterData;
        next();
    }).catch(err => console.log('ERROR:', err));
};

module.exports = userObject;