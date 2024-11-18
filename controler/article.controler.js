require('dotenv').config();
const models = require('../db/models')
const Joi = require('joi')
const joiToForms = require('joi-errors-for-forms').form
const changeCaseObject = require('change-case-object')

// article Get API
module.exports.articleGet = async function (req, res) {
    try{
         // Get page number from query params, default to 1 if not provided
         const page = parseInt(req.query.page) || 1;
         const limit = parseInt(req.query.limit) || 8; // Set default limit to 8
         const offset = (page - 1) * limit; // Calculate offset
         const articleId = parseInt(req.query.articleId);
         let findOption;
         if(isNaN(articleId)){
            findOption = {
                limit,
                offset
            }
             
         }else{
            findOption = {
                where: {
                    id: articleId 
                },
                limit,
                offset
            }
         }
         try{
            models.Article.findAll(findOption).then(data => {
                if (data.length > 0) {
                    res.status(200).json({
                        success: true,
                        message: `article fetched successfully`,
                        response: data
                    })
                } else {
                    res.status(200).json({
                        success: true,
                        message: `article not found`,
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
    }catch(error){
        res.status(500).json({
            success: false,
            message: `${error}`
        })
    }
}

module.exports.articleCreate = async function (req, res) {
    try{
        const bodyData = req.body
        const validatedObject = Joi.object({
            userId : Joi.string().required(),
            packageId : Joi.string().required(),
            categoryId : Joi.string().required(),
            companyId  : Joi.string().required(),
            title  : Joi.string().required(),
            author  : Joi.string(),
            slug  : Joi.string().required(),
            content  : Joi.string().required(),
            description  : Joi.string(),
            image  : Joi.string().required(),
            altTag  : Joi.string().required(),
            feed  : Joi.string(),
            mostViewed  : Joi.string().required(),
            publishDatetime  : Joi.string(),
            metaTitle  : Joi.string(),
            metaDescription  : Joi.string().required(),
            metaKeywords  : Joi.string().custom((value, helper) => {
                // Split the string into keywords using a comma as the delimiter
                const keywords = value.split(',').map(keyword => keyword.trim()).filter(keyword => keyword.length > 0);
                
                // Check if there are at least 5 keywords
                if (keywords.length < 5) {
                    return helper.message('metaKeywords must have at least 5 keywords');
                }
    
                // Optionally, validate that each keyword contains only valid characters (alphanumeric, spaces, etc.)
                const validKeywordRegex = /^[a-zA-Z0-9\s]+$/;
                for (let keyword of keywords) {
                    if (!validKeywordRegex.test(keyword)) {
                        return helper.message('Each keyword must only contain letters, numbers, and spaces');
                    }
                }
    
                return value;
            })
            .required(),
            pressType  : Joi.string().required(),
            status  : Joi.string().required(),
            type  : Joi.string().required(),
            videoUrl  : Joi.string().required(),
            createdBy  : Joi.string().required(),
            updatedBy  : Joi.string().required(),
            deletedAt  : Joi.string().required()
        })

        /* validating the validation values */
        const validateValue = validatedObject.validate({
            userId: bodyData.userId,
            packageId: bodyData.packageId,
            categoryId: bodyData.categoryId,
            companyId: bodyData.companyId,
            title: bodyData.title,
            author: bodyData.author,
            slug: bodyData.slug,
            content: bodyData.content,
            description: bodyData.description,
            image: bodyData.image,
            altTag: bodyData.altTag,
            feed: bodyData.feed,
            mostViewed: bodyData.mostViewed,
            publishDatetime: bodyData.publishDatetime,
            metaTitle: bodyData.metaTitle,
            metaDescription: bodyData.metaDescription,
            metaKeywords: bodyData.metaKeywords,
            pressType: bodyData.pressType,
            status: bodyData.status,
            type: bodyData.type,
            videoUrl: bodyData.videoUrl,
            createdBy: bodyData.createdBy,
            updatedBy: bodyData.updatedBy,
            deletedAt: bodyData.deletedAt

        }, {
            abortEarly: false
        })

        /* converts errors in key : value pair */
        const convertToForms = joiToForms()
        const validationError = convertToForms(validateValue.error)
        console.log(validationError,'error')
        if (validationError) {

            return res.status(200).json({
                success: false,
                message: `validation error: ${validationError}`
            })
        }
        const validatedValues = changeCaseObject.snakeCase(validateValue.value)
        try{
            models.Article.create(validatedValues).then(data => {
                res.status(200).json({
                    success: true,
                    message: `categories created successfully`,
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

module.exports.articleUpdate = async function(req, res) {
    try{
        const articleId = parseInt(req.query.articleId);
        const bodyData = req.body
        const validatedObject = Joi.object({
            userId : Joi.string(),
            packageId : Joi.string(),
            categoryId : Joi.string(),
            companyId  : Joi.string(),
            title  : Joi.string(),
            author  : Joi.string(),
            slug  : Joi.string(),
            content  : Joi.string(),
            description  : Joi.string(),
            image  : Joi.string(),
            altTag  : Joi.string(),
            feed  : Joi.string(),
            mostViewed  : Joi.string(),
            publishDatetime  : Joi.string(),
            metaTitle  : Joi.string(),
            metaDescription  : Joi.string(),
            metaKeywords  : Joi.string(),
            pressType  : Joi.string(),
            status  : Joi.string(),
            type  : Joi.string(),
            videoUrl  : Joi.string(),
            createdBy  : Joi.string(),
            updatedBy  : Joi.string(),
            deletedAt  : Joi.string()
        })

        /* validating the validation values */
        const validateValue = validatedObject.validate({
            userId: bodyData.userId,
            packageId: bodyData.packageId,
            categoryId: bodyData.categoryId,
            companyId: bodyData.companyId,
            title: bodyData.title,
            author: bodyData.author,
            slug: bodyData.slug,
            content: bodyData.content,
            description: bodyData.description,
            image: bodyData.image,
            altTag: bodyData.altTag,
            feed: bodyData.feed,
            mostViewed: bodyData.mostViewed,
            publishDatetime: bodyData.publishDatetime,
            metaTitle: bodyData.metaTitle,
            metaDescription: bodyData.metaDescription,
            metaKeywords: bodyData.metaKeywords,
            pressType: bodyData.pressType,
            status: bodyData.status,
            type: bodyData.type,
            videoUrl: bodyData.videoUrl,
            createdBy: bodyData.createdBy,
            updatedBy: bodyData.updatedBy,
            deletedAt: bodyData.deletedAt

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
            if(isNaN(categoryId)){
                res.status(401).json({
                    success:false,
                    message: 'category id not provided'
                })
            }else{
                models.Article.update(validatedValues, {where: {
                    id: articleId
                }}).then(data => {
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

module.exports.articleDelete = async function(req, res) {
     try{
        const articleId = parseInt(req.query.articleId)
        if (isNaN(articleId)) {
            res.status(401).json({
                success: false,
                message: 'article id not provided'
            })
        }else{
            models.Article.destroy({
                where: {
                    id: articleId
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
        }
     }catch(error){
        res.status(500).json({
            success: false,
            message: `Exception error: ${error}`
        })
     }
}