require('dotenv').config();
const models = require('../db/models')
const Joi = require('joi')
const joiToForms = require('joi-errors-for-forms').form
const changeCaseObject = require('change-case-object')

//package create API
module.exports.packageCreate = async function (req, res) {
    try{
        const bodyData = req.body
        const validatedObject = Joi.object({
            name: Joi.string().required(),
            price: Joi.string().required(),
            label: Joi.string().required(),
            status: Joi.boolean().required()
        })

        /* validating the validation values */
        const validateValue = validatedObject.validate({
            name: bodyData.name,
            price: bodyData.price,
            label: bodyData.label,
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
        try{
            models.Package.create(validatedValues).then(data => {
                res.status(200).json({
                    success: true,
                    message: 'package created successfully...',
                    response: data
                })
            })

        }catch(error){
            res.status(401).json({
                success: false,
                message: `database error: ${error}`
            })
        }
        
    }catch(error){
        res.status(500).json({
            success: false,
            message: `Exception error: ${error}`
        })
    }
}

// package Get API
module.exports.packageGet = async function (req, res) {
    try {
        try {
            models.Package.findAll().then(data => {
                if (data.length < 1) {
                    res.status(200).json({
                        success: true,
                        message: 'record not found',
                    })
                } else {
                    res.status(200).json({
                        success: true,
                        message: 'record fetch successfully....',
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

//Package edit API
module.exports.packageEdit = async function (req, res) {
    try {
        const packageId = parseInt(req.query.id)
        const bodyData = req.body
        const validatedObject = Joi.object({
            name: Joi.string(),
            price: Joi.string(),
            label: Joi.string(),
            status: Joi.boolean()
        })

        /* validating the validation values */
        const validateValue = validatedObject.validate({
            name: bodyData.name,
            price: bodyData.price,
            label: bodyData.label,
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
                message: "validation error"
            })
        }
        const validatedValues = changeCaseObject.snakeCase(validateValue.value)
        try {
            models.Package.update(validatedValues, {
                where: {
                    id: packageId
                }
            }).then(data => {
               console.log(data)
                if (data[0] < 1){
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

//Package delete API

module.exports.packageDelete = async function (req, res) {
    try{
        const packageId = parseInt(req.query.id)
        try{
            models.Package.destroy({
                where: {
                    id: packageId
                }
            }).then(data => {
                if(data < 1) {
                    res.status(200).json({
                        success: true,
                        message: 'record not found',
                    })
                }else{
                    res.status(200).json({
                        success: true,
                        message: 'record deleted successfully....',
                        response: data
                    })
                }
            })
        }catch(error) {
            res.status(401).json({
                success: false,
                message: `database error: ${error}`
            })
        }
    }catch(error){
        res.status(500).json({
            success: false,
            message: `Exception error: ${error}`
        })
    }
}




