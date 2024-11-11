require('dotenv').config();
const models = require('../db/models')
const Joi = require('joi')
const joiToForms = require('joi-errors-for-forms').form
const changeCaseObject = require('change-case-object')

//categories create API
module.exports.categoriesCreate = async function (req, res) {
    try {
        const bodyData = req.body
        const validatedObject = Joi.object({
            name: Joi.string().required(),
            slug: Joi.string().required(),
            code: Joi.string().required(),
            status: Joi.boolean().required()
        })

        /* validating the validation values */
        const validateValue = validatedObject.validate({
            name: bodyData.name,
            slug: bodyData.price,
            code: bodyData.label,
            status: bodyData.status
        }, {
            abortEarly: false
        })

        /* converts errors in key : value pair */
        const convertToForms = joiToForms()
        const validationError = convertToForms(validateValue.error)

        if (validationError) {

            return res.status(200).json({
                success: false,
                message: `validation error: ${validationError}`
            })
        }
        const validatedValues = changeCaseObject.snakeCase(validateValue.value)
        try {
            models.Categories.create(validatedValues).then(data => {
                res.status(200).json({
                    success: true,
                    message: `categories created successfully`,
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

//categories get API

module.exports.categoriesGet = async function (req, res) {
    try {
        // Get page number from query params, default to 1 if not provided
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 8; // Set default limit to 8
        const offset = (page - 1) * limit; // Calculate offset
        const categoryId = parseInt(req.query.categoryId);
        let findOption;
        if (categoryId) {
            findOption = {
                where: {
                    id: categoryId
                },
                limit,
                offset
            }
        } else {
            findOption = {
                limit,
                offset
            }
        }
        try {
            models.Categories.findAll(findOption).then(data => {
                if (data.length > 0) {
                    res.status(200).json({
                        success: true,
                        message: `categories fetched successfully`,
                        response: data
                    })
                } else {
                    res.status(200).json({
                        success: true,
                        message: `categories not found`,
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

module.exports.categoriesUpdate = async function (req, res) {
    try {
        const categoryId = parseInt(req.query.categoryId);
        const bodyData = req.body
        const validatedObject = Joi.object({
            name: Joi.string(),
            slug: Joi.string(),
            code: Joi.string(),
            status: Joi.boolean()
        })

        /* validating the validation values */
        const validateValue = validatedObject.validate({
            name: bodyData.name,
            slug: bodyData.price,
            code: bodyData.label,
            status: bodyData.status
        }, {
            abortEarly: false
        })

        /* converts errors in key : value pair */
        const convertToForms = joiToForms()
        const validationError = convertToForms(validateValue.error)

        if (validationError) {

            return res.status(200).json({
                success: false,
                message: `validation error: ${validationError}`
            })
        }
        const validatedValues = changeCaseObject.snakeCase(validateValue.value)

        try {
            console.log(isNaN(categoryId), 'categoryId')
            if(isNaN(categoryId)){
                res.status(401).json({
                    success:false,
                    message: 'category id not provided'
                })
            }else{
                models.Categories.update(validatedValues, {
                    where: { id: categoryId }
                }).then(data => {
                    if (data[0] < 1) {
                        res.status(200).json({
                            success: true,
                            message: 'record not found',
                        })
                    } else {
                        res.status(200).json({
                            success: true,
                            message: 'record updated successfully....',
                            response: data
                        })
                    }
                })
            }
            
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
