// Import section
require('dotenv').config();
const models = require('../db/models')
const Joi = require('joi')
const joiToForms = require('joi-errors-for-forms').form
const changeCaseObject = require('change-case-object')
const jwt = require('jsonwebtoken')
const md5 = require('md5')

module.exports.login = async function (req, res) {

    try {
        const bodyData = req.body

        // Validation part 
        const validatedObject = Joi.object({
            email: Joi.string().email().insensitive().lowercase().required(),
            password: Joi.string().min(5).max(16).required(),
        })

        /* validating the validation values */
        const validateValue = validatedObject.validate({
            email: bodyData.email,
            password: bodyData.password
        }, {
            abortEarly: false
        })

        /* converts errors in key : value pair */
        const convertToForms = joiToForms()

        const validationError = convertToForms(validateValue.error)

        if (validationError) {
            return res.status(200).json({
                success: false,
                message: "validation error"
            })
        }
        const validatedValues = changeCaseObject.snakeCase(validateValue.value)

        // find user by email or password
        const findUserOptions = {
            raw: true,
            attributes: ['email', 'id', 'user_type'],
            where: {
                email: validatedValues.email,
                password: md5(validatedValues.password)
            }
        }
        try {
            models.User.findAll(findUserOptions).then(data => {
                if (data.length > 0) {
                    const userPayload = {
                        email: data[0].email,
                        userId: data[0].id,
                        role: data[0].user_type
                    }
                    const aToken = jwt.sign(
                        userPayload,
                        process.env.JWT_SECRET_KEY,
                        {
                            subject: 'access',
                            expiresIn: '7d'
                        }
                    )
                    res.status(200).json({
                        success: true,
                        message: 'login successfull',
                        response: aToken
                    })
                } else {
                    res.status(200).json({
                        success: false,
                        message: 'user not found'
                    })
                }
            })
        } catch (error) {
            res.status(401).json({
                success: false,
                message: `database error: ${error}`
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `${error}`
        })
    }
}