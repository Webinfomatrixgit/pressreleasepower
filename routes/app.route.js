// IMPORT SECTION
const express = require('express')
const multer = require('multer')
const authControler = require('../controler/user.controler')

// VARIABLE DECLARATION SECTION
const router = express.Router()

const storage = multer.memoryStorage({
    destination: function (req, file, callback) {
        callback(null, '')
    }
})
const multipleUpload = multer({ storage }).fields([
    { name: 'profileImage', maxCount: 1 }
])


// auth 
router.post('/login', authControler.login)



module.exports = router

