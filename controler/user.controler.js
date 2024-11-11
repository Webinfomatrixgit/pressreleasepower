require('dotenv').config();
const models = require('../db/models')
const Joi = require('joi')
const joiToForms = require('joi-errors-for-forms').form
const changeCaseObject = require('change-case-object')

// user Get API
module.exports.userGet = async function (req, res) {
    try {
        // Get page number from query params, default to 1 if not provided
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 8; // Set default limit to 8
        const offset = (page - 1) * limit; // Calculate offset
        const userId = parseInt(req.query.userId);
        let findOption;
        if(userId){
            findOption = {
                where: {
                    id: userId 
                },
                limit,
                offset
            }
        }else{
            findOption = {
                limit,
                offset
            }
        }
        try{
            models.User.findAll(findOption).then(data=> {
                if(data.length <1 ){
                    res.status(200).json({
                        success: true,
                        message: 'record not found',
                    })
                }else{
                    data.map(record => {
                        delete record.dataValues.password
                    })
                    res.status(200).json({
                        success: true,
                        message: 'record fetch successfully....',
                        response: data
                    })
                }
            })
        }catch (error){
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

// Delete User API
module.exports.userDelete = async function (req, res) {
    try{
        const userId = parseInt(req.query.userId)

        try{
            models.User.destroy({
                where: {
                    id: userId
                }
            }).then(data => {
                if(data == 0){
                    res.status(401).json({
                        success: false,
                        message: 'record not found'
                    })
                }else{
                    res.status(200).json({
                        success: true,
                        message: 'record deleted successfully....'
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
            message: `Exception error: ${error}`
        })
    }
}

// user update API
module.exports.userUpdate = async function (req,  res){
    // handle exception error
    try{
        const userId = parseInt(req.query.userId)
        const bodyData = req.body
        const validatedObject = Joi.object({
            firstName: Joi.string(),
            lastName: Joi.string(),
            email: Joi.string().email().insensitive().lowercase(),
            password: Joi.string().min(5).max(16),
            phone: Joi.string().regex(/[0-9]{10}/)
        })

        /* validating the validation values */
        const validateValue = validatedObject.validate({
            firstName: bodyData.firstName,
            lastName: bodyData.lastName,
            email: bodyData.email,
            password: bodyData.password,
            phone: bodyData.phone,
        }, {
            abortEarly: false
        })
        /* converts errors in key : value pair */
        const convertToForms = joiToForms([
            {
                regex: '/[0-9]{10}/',
                message: '"${key}" must be a valid 10 digit contact number.'
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
                message: "validation error"
            })
        }
        const validatedValues = changeCaseObject.snakeCase(validateValue.value)
        if (validatedValues.phone) {
            /* checking phone number's valid digits */
            if (validatedValues.phone.length != 10) {
                return res.status(200).json({
                    success: false,
                    message: validatedValues.phone + ' Please check your phone number'
                })
            }
        }
        //Handle for database error
        try{
            models.User.update(validatedValues, {where: {id: userId}}).then(data => {
                console.log(data[0],'updated data')
                if(data[0] < 1 ) {
                    res.status(401).json({
                        success:false,
                        message: 'record not found'
                    })
                }else{
                    res.status(200).json({
                        success: true,
                        message: 'record updated successfully'
                    })
                }
            })
        }catch(error){
            res.status(401).json({
                success: false,
                message: `database error: ${error}`
            })
        }

    }catch(error) {
        res.status(500).json({
            success: false,
            message: `Exception error: ${error}`
        })
    }
}
