// IMPORT SECTION
const express = require('express')
const multer = require('multer')
const authControler = require('../controler/auth.controler')
const userControler = require('../controler/user.controler')

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

// user API
router.get('/user', userControler.userGet)
router.delete('/user', userControler.userDelete)
router.put('/user', userControler.userUpdate)



module.exports = router

