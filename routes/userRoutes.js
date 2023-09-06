const express = require('express')
const {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserAndPassword
} = require('../controllers/userController')
const { authenticateUser, authorizePermissions }  =require('../middleware/authentication')


const router = express.Router()

router.route('/').get(authenticateUser,authorizePermissions,getAllUsers), 
router.route('/show').get(showCurrentUser),
router.route('/update-user').patch(updateUser)
router.route('/update-user-password').patch(updateUserAndPassword)
router.route('/:id').get(authenticateUser,getSingleUser)


module.exports = router