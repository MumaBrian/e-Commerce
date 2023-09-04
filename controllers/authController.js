const User = require('../models/User')
const {StatusCodes} =require('http-status-codes')
const customError=require('../errors')


const register = async (req, res) => {
    const { email,password,name } = req.body
    const emailAlreadyExist = await User.findOne({ email })
    if (emailAlreadyExist) {
        throw new customError.BadRequestError('Email already exists.')
    }

    const isFirstAccount = (await User.countDocuments({})) === 0
    const role=isFirstAccount ? 'admin':'user'

    const user = await User.create({email, password, name,role})
    res.status(StatusCodes.CREATED).json({user})
    // res.send('register user')
}

const login = async (req, res) => {
res.send('login user')
}

const logout = async (req, res) => {
res.send('logout user')
}

module.exports = {
    register,
    login,
    logout
}