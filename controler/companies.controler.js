require('dotenv').config();
const models = require('../db/models')
const Joi = require('joi')
const joiToForms = require('joi-errors-for-forms').form
const changeCaseObject = require('change-case-object')

//companies create API
module.exports.companyCreate = async function (req, res) {
    try {
        const bodyData = req.body
        const validatedObject = Joi.object({
            userId: Joi.string(),
            name: Joi.string(),
            slug: Joi.string(),
            description: Joi.string(),
            email: Joi.string().email().insensitive().lowercase(),
            phone: Joi.string().regex(/[0-9]{10}/),
            contactPerson: Joi.string(),
            website: Joi.string(),
            cityName: Joi.string(),
            stateName: Joi.string(),
            countryName: Joi.string(),
            cityId: Joi.integer(),
            stateId: Joi.integer(),
            countryId: Joi.integer(),
            address: Joi.string(),
            logo: Joi.string(),
            status: Joi.boolean(),
            userLimit: Joi.integer(),
            storageLimit: Joi.integer()
        })

        /* validating the validation values */
        const validateValue = validatedObject.validate({
            userId: bodyData.userId,
            name: bodyData.name,
            slug: bodyData.price,
            description: bodyData.description,
            email: bodyData.email,
            phone: bodyData.phone,
            contactPerson: bodyData.contactPerson,
            website: bodyData.website,
            cityName: bodyData.cityName,
            stateName: bodyData.stateName,
            countryName: bodyData.countryName,
            cityId: bodyData.cityId,
            stateId: bodyData.stateId,
            countryId: bodyData.countryId,
            address: bodyData.address,
            logo: bodyData.logo,
            status: bodyData.status,
            userLimit: bodyData.userLimit,
            storageLimit: bodyData.storageLimit
        }, {
            abortEarly: false
        })

        /* converts errors in key : value pair */
        const convertToForms = joiToForms([{
            regex: '/[0-9]{10}/',
            message: '"${key}" must be a valid 10 digit telephone number.'
        },
        {
            regex: '/[0-9]/',
            message: '"${key}" must be a number.'
        }
        ])
        const validationError = convertToForms(validateValue.error)
        if (validationError) {

            return res.status(200).json({
                success: false,
                message: `validation error: ${validationError}`
            })
        }
        const validatedValues = changeCaseObject.snakeCase(validateValue.value)
        try {
            models.Companies.create(validatedValues).then(data => {
                res.status(200).json({
                    success: true,
                    message: `companay created successfully`,
                    response: data
                })
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
            message: `Exception error: ${error}`
        })
    }
}

//companies get API
module.exports.companyGet = async function (req, res) {
    try {
        try {
            const findAtt = {
                attributes: ['id', 'name', 'email', 'phone', 'website']
            }
            models.Companies.findAll(findAtt).then(data => {
                if (data.length < 1) {
                    res.status(200).json({
                        success: true,
                        message: `record not found`,
                        response: data
                    })
                } else {
                    res.status(200).json({
                        success: true,
                        message: `company fetched successfully`,
                        response: data
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
            message: `Exception error: ${error}`
        })
    }
}

//companies Update API
module.exports.companyUpdate = async function (req, res) {
    try {
        const companyId = parseInt(req.query.companayId)
        const bodyData = req.body
        const validatedObject = Joi.object({
            userId: Joi.string(),
            name: Joi.string(),
            slug: Joi.string(),
            description: Joi.string(),
            email: Joi.string().email().insensitive().lowercase(),
            phone: Joi.string().regex(/[0-9]{10}/),
            contactPerson: Joi.string(),
            website: Joi.string(),
            cityName: Joi.string(),
            stateName: Joi.string(),
            countryName: Joi.string(),
            cityId: Joi.integer(),
            stateId: Joi.integer(),
            countryId: Joi.integer(),
            address: Joi.string(),
            logo: Joi.string(),
            status: Joi.boolean(),
            userLimit: Joi.integer(),
            storageLimit: Joi.integer()
        })

        /* validating the validation values */
        const validateValue = validatedObject.validate({
            userId: bodyData.userId,
            name: bodyData.name,
            slug: bodyData.price,
            description: bodyData.description,
            email: bodyData.email,
            phone: bodyData.phone,
            contactPerson: bodyData.contactPerson,
            website: bodyData.website,
            cityName: bodyData.cityName,
            stateName: bodyData.stateName,
            countryName: bodyData.countryName,
            cityId: bodyData.cityId,
            stateId: bodyData.stateId,
            countryId: bodyData.countryId,
            address: bodyData.address,
            logo: bodyData.logo,
            status: bodyData.status,
            userLimit: bodyData.userLimit,
            storageLimit: bodyData.storageLimit
        }, {
            abortEarly: false
        })
        /* converts errors in key : value pair */
        const convertToForms = joiToForms([{
            regex: '/[0-9]{10}/',
            message: '"${key}" must be a valid 10 digit telephone number.'
        },
        {
            regex: '/[0-9]/',
            message: '"${key}" must be a number.'
        }
        ])
        const validationError = convertToForms(validateValue.error)
        if (validationError) {

            return res.status(200).json({
                success: false,
                message: `validation error: ${validationError}`
            })
        }
        const validatedValues = changeCaseObject.snakeCase(validateValue.value)
        if (isNaN(companyId)) {
            res.status(401).json({
                success: false,
                message: 'company id not provided'
            })
        } else {
            try {
                models.Companies.update(validatedValues, {
                    where: {
                        id: companyId
                    }
                }).then(data => {
                    if (data[0] < 1) {
                        res.status(200).json({
                            success: true,
                            message: 'record not found'
                        })
                    } else {
                        res.status(200).json({
                            success: true,
                            message: 'record updated successfully',
                            response: data
                        })
                    }
                })
            } catch (error) {
                res.status(401).json({
                    success: false,
                    message: `database error: ${error}`
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Exception error: ${error}`
        })
    }
}

//companies Delete API
module.exports.companyDelete = async function (req, res) {
    try {
        const companyId = parseInt(req.query.companayId)
        if (isNaN(companyId)) {
            res.status(401).json({
                success: false,
                message: 'company id not provided'
            })
        } else {
            try {
                models.Companies.destroy({
                    where: {
                        id: companyId
                    }
                }).then(data => {
                    if (data < 1) {
                        res.status(200).json({
                            success: true,
                            message: 'record not found'
                        })
                    } else {
                        res.status(200).json({
                            success: true,
                            message: 'record deleted successfully....',
                            response: data
                        })
                    }
                })
            } catch (error) {
                res.status(401).json({
                    success: false,
                    message: `database error: ${error}`
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Exception error: ${error}`
        })
    }
}
