import express from "express"
import env from "dotenv"
import bookRouter from "./routes/bookRoutes.js"
import userRouter from "./routes/userRoutes.js"
import mongoose from "mongoose"
import cors from 'cors'

// Express App
const app = express()

env.config()

// Middleware
app.use(cors())
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Routes
app.use('/api/user', userRouter)
app.use('/api/books', bookRouter)

// DB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`listening on http://localhost:${process.env.PORT}`)
    }
)
})
.catch((error) => {
    console.log(error)
})