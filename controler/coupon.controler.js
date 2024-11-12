require('dotenv').config();
const models = require('../db/models')
const Joi = require('joi')
const joiToForms = require('joi-errors-for-forms').form
const changeCaseObject = require('change-case-object')

//coupon get API
module.exports.couponGet = async function (req, res) {
    try {
        // Get page number from query params, default to 1 if not provided
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 8; // Set default limit to 8
        const offset = (page - 1) * limit; // Calculate offset
        const couponId = parseInt(req.query.couponId);
        let findOption;
        if (isNaN(couponId)) {
            findOption = {
                limit,
                offset
            }

        } else {
            findOption = {
                where: {
                    id: couponId
                },
                limit,
                offset
            }
        }
        try {
            models.Coupon.findAll(findOption).then(data => {
                res.status(200).json({
                    success: true,
                    message: `record fetched successfully`,
                    response: { data, couponCount: data.length }
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

//coupon delete API
module.exports.couponDelete = async function (req, res) {
    try {
        const couponId = parseInt(req.query.couponId)
        if(isNaN(couponId)){
            res.status(400).json({
                success: false,
                message: 'couponId not provided'
            })
        }else{
            try{
                models.Coupon.destroy({where: {
                    id: couponId
                }}).then(data => {
                    if (data < 1) {
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
            }catch(error){
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

//coupon create API
module.exports.couponCreate = async function (req, res) {
    try{
        const bodyData = req.body 
        const validatedObject = Joi.object({
            type : Joi.string(),
            couponType : Joi.string(),
            code : Joi.string(),
            percent : Joi.string(),
            expireStart : Joi.string(),
            expireEnd : Joi.string(),
            totalNo : Joi.string(),
            attemptNo : Joi.string()
        })

        /* validating the validation values */
        const validateValue = validatedObject.validate({
            type: bodyData.type,
            couponType: bodyData.couponType,
            code: bodyData.code,
            percent: bodyData.percent,
            expireStart: bodyData.expireStart,
            expireEnd: bodyData.expireEnd,
            totalNo: bodyData.totalNo,
            attemptNo: bodyData.attemptNo
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
            models.Coupon.create(validatedValues).then(data=> {
                res.status(200).json({
                    success: true,
                    message: 'coupon created successfully...',
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

//coupon update API
module.exports.couponUpdate = async function (req, res) {
    try{
        const bodyData = req.body 
        const couponId = parseInt(req.query.couponId)
        const validatedObject = Joi.object({
            type : Joi.string(),
            couponType : Joi.string(),
            code : Joi.string(),
            percent : Joi.string(),
            expireStart : Joi.string(),
            expireEnd : Joi.string(),
            totalNo : Joi.string(),
            attemptNo : Joi.string()
        })

        /* validating the validation values */
        const validateValue = validatedObject.validate({
            type: bodyData.type,
            couponType: bodyData.couponType,
            code: bodyData.code,
            percent: bodyData.percent,
            expireStart: bodyData.expireStart,
            expireEnd: bodyData.expireEnd,
            totalNo: bodyData.totalNo,
            attemptNo: bodyData.attemptNo
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
            if(isNaN(couponId)){
                res.status(400).json({
                    success: false,
                    message: 'coupon id not provided'
                })
            }else{
                models.Coupon.create(validatedValues, {
                    where: {
                        id: couponId
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