import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import connectDb from './config/connectDB.js'
import cookieParser from 'cookie-parser'
import authRouter from './route/authRoute.js'
import cors from 'cors'
import userRouter from './route/userRoute.js'
import courseRouter from './route/courseRoute.js'
import paymentRouter from './route/paymentRoute.js'
import reviewRouter from './route/reviewRoute.js'

const port = process.env.PORT || 8000  // ← YOU REMOVED THIS
const app = express()                   // ← YOU REMOVED THIS

app.use(express.json())                 // ← YOU REMOVED THIS
app.use(cookieParser())                 // ← YOU REMOVED THIS

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://major-1-wr6v.onrender.com",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))
app.options("*", cors())

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/course", courseRouter)
app.use("/api/order", paymentRouter)
app.use("/api/review", reviewRouter)

app.get("/", (req, res) => {
    res.send("hello from server")
})

app.listen(port, () => {
    console.log("server started")
    connectDb()
})
