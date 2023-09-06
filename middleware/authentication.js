const CustomError = require('../errors')
const { isTokenValid } = require('../utils')



const authenticateUser = async (req, res, next) => {
    const token = req.signedCookies.token
    console.log("token:",token)
    if (!token) {
        throw new CustomError.UnauthenticatedError('Authentication Invalid')
    }
    try {
        const {name,userId,role} = isTokenValid({ token })
        req.user = { name, userId, role }
        console.log("user:",req.user)
        // const payload = isTokenValid({ token })
        // console.log("payload:",payload)
      next()

    } catch (error) {
        throw new CustomError.UnauthenticatedError('Authentication Invalid')

    }
}

const authorizePermissions = async (req, res, next) => {
    if (req.user.role !== 'admin') {
        throw new CustomError.UnauthorizedError('Unauthorized to access this route')
    }
//    console.log('admin route')
    next()  
}


module.exports = {
    authenticateUser,
    authorizePermissions
 }