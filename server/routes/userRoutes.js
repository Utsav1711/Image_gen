// import express from 'express'
// import {loginUser,registerUser, userCredits} from '../controllers/userController.js'
// import {paymentRazorpay} from '../controllers/userController.js'
// import userAuth from '../middlewares/auth.js'

// const userRouter = express.Router()

// userRouter.post('/register',registerUser)
// userRouter.post('/login',loginUser)
// userRouter.get('/credits',userAuth,userCredits)
// userRouter.post('/payment/razorpay',userAuth,paymentRazorpay)


// export default userRouter; 


import express from 'express'
import {loginUser,registerUser, userCredits} from '../controllers/userController.js'
import {paymentRazorpay, verifyRazorpay} from '../controllers/userController.js'
import userAuth from '../middlewares/auth.js'

const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/credits',userAuth,userCredits)
userRouter.post('/payment/razorpay',userAuth,paymentRazorpay)
userRouter.post('/payment/verify',userAuth,verifyRazorpay)


export default userRouter; 
