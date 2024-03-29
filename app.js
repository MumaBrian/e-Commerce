require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
const notFoundMiddleware=require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const morgan=require('morgan')
const authRouter=require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes')
const reviewRouter = require('./routes/reviewRoutes')
const productRouter = require('./routes/productRoutes')
const orderRouter = require('./routes/orderRoutes')
const cookieParser=require('cookie-parser')
const fileUpload=require('express-fileupload')

const port = process.env.PORT || 3000

// database
const connectDB = require('./db/connect');

//middleware
app.use(morgan('tiny'))
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))
app.use(express.static('./public'))
app.use(fileUpload())


//Route
app.get('/', (req, res) => {
    res.send('e-commerce api')
    console.log(req.signedCookies)
})
app.use('/auth',authRouter)
app.use('/users', userRouter)
app.use('/products', productRouter)
app.use('/reviews', reviewRouter)
app.use('/orders',orderRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);

        app.listen(port,console.log(`server is listening on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}
start();

console.log('E-Commerce API');
