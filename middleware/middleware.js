require('dotenv').config();

const jwt = require('jsonwebtoken')

const checkToken = (req, res, next) => {

    // Express headers are auto converted to lowercase
    let token = req.headers['x-access-token'] || req.headers.authorization

    if (token != undefined && token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length)
    }

    if (token) {
        // log.info("[middleware.js]: checkToken(): TOKEN: %o", token)
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                delete err.stack
                return res.status(401).json({
                    success: false,
                    message: errorMessages.AUTH_TOKEN_IS_NOT_VALID
                })
            } else {
                next()
            }
        })
    } else {
        return res.status(401).json({
            success: false,
            message: errorMessages.AUTH_TOKEN_IS_NOT_SUPPLIED
        })
    }
}

module.exports.checkToken =  checkToken