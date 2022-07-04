const jwt = require('jsonwebtoken');
const config = require('../config/config.json')

module.exports = {
    issue(payload, expirationDate) {
        return jwt.sign(payload, config.development.secret, {
            expiresIn: expirationDate
        });
    },
    verify(token) {
        return jwt.verify(token, config.development.secret);
    }
};