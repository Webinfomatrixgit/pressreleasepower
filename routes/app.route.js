// IMPORT SECTION
const express = require('express')
const multer = require('multer')
const authControler = require('../controler/auth.controler')
const userControler = require('../controler/user.controler')
const middleware = require('../middleware/middleware')

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
router.get('/user', middleware.checkToken, userControler.userGet)
router.delete('/user', middleware.checkToken, userControler.userDelete)
router.put('/user', middleware.checkToken, userControler.userUpdate)



module.exports = router

