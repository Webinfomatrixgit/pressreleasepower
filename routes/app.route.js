// IMPORT SECTION
const express = require('express')
const multer = require('multer')
const authControler = require('../controler/auth.controler')
const userControler = require('../controler/user.controler')
const packageControler = require('../controler/package.controler')
const categorieControler = require('../controler/categories.controler')
const companiesControler = require('../controler/companies.controler')
const videoPrControler = require('../controler/pr.controler')
const articleControler = require('../controler/article.controler')
const couponControler = require('../controler/coupon.controler')
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

// auth APIs
router.post('/login', authControler.login)

// user APIs
router.get('/user', [middleware.checkToken, role.hasRole(superAdminAccess)], userControler.userGet)
router.delete('/user', [middleware.checkToken, role.hasRole(superAdminAccess)], userControler.userDelete)
router.put('/user', [middleware.checkToken, role.hasRole(superAdminAccess)], userControler.userUpdate)

// Package APIs
router.post('/package', [middleware.checkToken, role.hasRole(superAdminAccess)], packageControler.packageCreate)
router.get('/package',[middleware.checkToken, role.hasRole(superAdminAccess)], packageControler.packageGet)
router.put('/package', [middleware.checkToken, role.hasRole(superAdminAccess)], packageControler.packageUpdate)
router.delete('/package', [middleware.checkToken, role.hasRole(superAdminAccess)], packageControler.packageDelete)

// Categories APIs
router.post('/categories', [middleware.checkToken, role.hasRole(superAdminAccess)], categorieControler.categoriesCreate)
router.get('/categories',  [middleware.checkToken, role.hasRole(superAdminAccess)], categorieControler.categoriesGet)
router.put('/categories', [middleware.checkToken, role.hasRole(superAdminAccess)], categorieControler.categoriesUpdate)

// Companey APIs
router.get('/company', [middleware.checkToken, role.hasRole(superAdminAccess)], companiesControler.companyGet)
router.post('/company', [middleware.checkToken, role.hasRole(superAdminAccess)], companiesControler.companyCreate)
router.put('/company', [middleware.checkToken, role.hasRole(superAdminAccess)], companiesControler.companyUpdate)
router.delete('/company', [middleware.checkToken, role.hasRole(superAdminAccess)], companiesControler.companyDelete) 

// Article APIs
router.get('/article', [middleware.checkToken, role.hasRole(superAdminAccess)], articleControler.articleGet)
router.post('/article', [middleware.checkToken, role.hasRole(superAdminAccess)], articleControler.articleCreate)
router.put('/article', [middleware.checkToken, role.hasRole(superAdminAccess)], articleControler.articleUpdate)
router.delete('/article', [middleware.checkToken, role.hasRole(superAdminAccess)], articleControler.articleDelete)

// pr APIs
router.get('/videopr', [middleware.checkToken, role.hasRole(superAdminAccess)], videoPrControler.videoPrGet)
router.delete('/videopr', [middleware.checkToken, role.hasRole(superAdminAccess)], videoPrControler.videoPrDelete)
router.put('/videopr', [middleware.checkToken, role.hasRole(superAdminAccess)], videoPrControler.videoPrUpdate)
router.post('/videopr', [middleware.checkToken, role.hasRole(superAdminAccess)], videoPrControler.videoPrCreate)

// coupon APIs
router.get('/coupon', [middleware.checkToken, role.hasRole(superAdminAccess)], couponControler.couponGet)
router.delete('/coupon', [middleware.checkToken, role.hasRole(superAdminAccess)],couponControler.couponDelete)
router.put('/coupon', [middleware.checkToken, role.hasRole(superAdminAccess)],couponControler.couponUpdate)
router.post('/coupon', [middleware.checkToken, role.hasRole(superAdminAccess)],couponControler.couponCreate)


module.exports = router
