const express = require('express')
const {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserAndPassword
} = require('../controllers/userController')

const router = express.Router()

router.route('/').get(getAllUsers), 
router.route('/show').get(showCurrentUser),
router.route('/update-user').post(updateUser)
router.route('/update-user-password').post(updateUserAndPassword)
router.route('/:id').get(getSingleUser)


module.exports = router