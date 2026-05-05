import express from 'express'
import { Razorpayorder, verifyPayment } from '../controller/orderController.js'

const paymentRouter = express.Router()

paymentRouter.post("/razorpay-order", Razorpayorder)
paymentRouter.post("/verifypayment", verifyPayment)

export default paymentRouter