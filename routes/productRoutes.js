const {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    uploadImage
} = require('../controllers/productController')
const express = require('express')
const { authenticateUser, authorizePermissions } = require('../middleware/authentication')


const router = express.Router()

router.route('/').post(authenticateUser, authorizePermissions('admin'),createProduct)
router.route('/').get(authenticateUser, getAllProducts)

router.route('/upload-image').post(authenticateUser, uploadImage)

router.route('/:id').get(authenticateUser, getSingleProduct)
router.route('/').patch(authenticateUser, authorizePermissions('admin'), updateProduct)
router.route('/').delete(authenticateUser, authorizePermissions('admin'), deleteProduct)
router.route('/upload-image').post(authenticateUser, uploadImage)


module.exports=router