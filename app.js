require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
const notFoundMiddleware=require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const morgan=require('morgan')
const authRouter=require('./routes/authRoutes')

const port = process.env.PORT || 3000

// database
const connectDB = require('./db/connect');

//middleware
app.use(morgan('tiny'))
app.use(express.json())

//Route
app.get('/', (req, res) => {
    res.send('e-commerce api')
})
app.use('/auth',authRouter)

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
