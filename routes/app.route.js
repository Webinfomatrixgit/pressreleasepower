// IMPORT SECTION
const express = require('express')
const multer = require('multer')
const authControler = require('../controler/auth.controler')
const userControler = require('../controler/user.controler')
const packageControler = require('../controler/package.controler')
const middleware = require('../middleware/middleware')
const role = require('../middleware/role')
const models = require('../db/models')

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

const superAdminAccess = [models.User.UserType.SUPER_ADMIN]

// auth 
router.post('/login', authControler.login)

// user API
router.get('/user', [middleware.checkToken, role.hasRole(superAdminAccess)] ,userControler.userGet)
router.delete('/user', [middleware.checkToken, role.hasRole(superAdminAccess)], userControler.userDelete)
router.put('/user', [middleware.checkToken, role.hasRole(superAdminAccess)], userControler.userUpdate)

// Package API
router.post('/package', [middleware.checkToken, role.hasRole(superAdminAccess)], packageControler.packageCreate)
router.get('/package',[middleware.checkToken, role.hasRole(superAdminAccess)], packageControler.packageGet)
router.put('/package', [middleware.checkToken, role.hasRole(superAdminAccess)], packageControler.packageEdit)
router.delete('/package', [middleware.checkToken, role.hasRole(superAdminAccess)], packageControler.packageDelete)

module.exports = router

