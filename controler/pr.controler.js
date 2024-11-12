require('dotenv').config();
const models = require('../db/models')
const Joi = require('joi')
const joiToForms = require('joi-errors-for-forms').form
const changeCaseObject = require('change-case-object')

// pr Get API
module.exports.videoPrGet = async function (req, res) {
    try{
         // Get page number from query params, default to 1 if not provided
         const page = parseInt(req.query.page) || 1;
         const limit = parseInt(req.query.limit) || 8; // Set default limit to 8
         const offset = (page - 1) * limit; // Calculate offset
         const prId = parseInt(req.query.prId);
         let findOption;
         if(isNaN(prId)){
            findOption = {
                limit,
                offset
            }
             
         }else{
            findOption = {
                where: {
                    id: prId 
                },
                limit,
                offset
            }
         }
         try{
            models.Videopr.findAll(findOption).then(data => {
                res.status(200).json({
                    success: true,
                    message: `record fetched successfully`,
                    response: {data, prCount: data.length}
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

// pr delete API
module.exports.videoPrDelete = async function (req, res) {
    try{
        const prId = parseInt(req.query.prId);
        if(isNaN(prId)){
            res.status(400).json({
                success: false,
                message: 'prId not provided'
            })
        }else{
            try{
                models.Videopr.destroy({
                    where: {
                        id: prId
                    }
                }).then(data => {
                    if (data < 1) {
                        res.status(200).json({
                            success: true,
                            message: 'record not found',
                        })
                    } else {
                        res.status(200).json({
                            success: true,
                            message: 'record deleted successfully....',
                            response: data
                        })
                    }
                })
            }catch(error){
                res.status(401).json({
                    success: false,
                    message: `database error: ${error}`
                })
            }
        }
    }catch(error){
        res.status(500).json({
            success: false,
            message: `Exception error: ${error}`
        })
    }
}

// pr create API
module.exports.videoPrCreate = async function (req, res) {
    try{
        const bodyData = req.body
        const validatedObject = Joi.object({
            categoryId : Joi.string(),
            countryId : Joi.string(),
            userId : Joi.string(),
            name : Joi.string(),
            slug : Joi.string(),
            content : Joi.string(),
            url : Joi.string(),
            filename : Joi.string(),
            metaTitle : Joi.string(),
            metaKeywords : Joi.string(),
            metaDescription : Joi.string(),
            status : Joi.boolean()  
        })

        /* validating the validation values */
        const validateValue = validatedObject.validate({
            categoryId: bodyData.categoryId,
            countryId: bodyData.countryId,
            userId: bodyData.userId,
            name: bodyData.name,
            slug: bodyData.slug,
            content: bodyData.content,
            url: bodyData.url,
            filename: bodyData.filename,
            metaTitle: bodyData.metaTitle,
            metaKeywords: bodyData.metaKeywords,
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
            models.Videopr.create(validatedValues).then(data => {
                res.status(200).json({
                    success: true,
                    message: 'pr created successfully...',
                    response: data
                })
            })
        }catch(error){
            res.status(500).json({
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

// pr update API
module.exports.videoPrUpdate = async function (req, res) {
    try{
        const prId = parseInt(req.query.prId)
        const bodyData = req.body
        const validatedObject = Joi.object({
            categoryId : Joi.string(),
            countryId : Joi.string(),
            userId : Joi.string(),
            name : Joi.string(),
            slug : Joi.string(),
            content : Joi.string(),
            url : Joi.string(),
            filename : Joi.string(),
            metaTitle : Joi.string(),
            metaKeywords : Joi.string(),
            metaDescription : Joi.string(),
            status : Joi.boolean()  
        })

        /* validating the validation values */
        const validateValue = validatedObject.validate({
            categoryId: bodyData.categoryId,
            countryId: bodyData.countryId,
            userId: bodyData.userId,
            name: bodyData.name,
            slug: bodyData.slug,
            content: bodyData.content,
            url: bodyData.url,
            filename: bodyData.filename,
            metaTitle: bodyData.metaTitle,
            metaKeywords: bodyData.metaKeywords,
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
            if(isNaN(prId)){
                res.status(400).json({
                    success: false,
                    message: 'prId not provided'
                })
            }else{
                models.Videopr.update(validatedValues, {
                    where : {
                        id: prId
                    }
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