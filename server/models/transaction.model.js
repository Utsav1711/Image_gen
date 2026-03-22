// import mongoose from "mongoose";
// import { Schema } from "mongoose";

// // userId,
// // plan,
// // credits,
// // amount,
// // date

// const transactionSchema = new Schema({
//         userId : {
//             type: String,
//             required: true,
//         },
//         plan : {
//             type: String,
//             required: true,
//         },
//         credits : {
//             type: Number,
//             required: true,
//         },
//         amount : {
//             type: Number,
//             required: true,
//         },
//         date : {
//             type : Date,
//             default: Date.now,
//         },
//         payment : {
//             type : Boolean,
//             default : false,
//         }
//     });

// // use capitalized "User" for consistency
// const TransactionModel = mongoose.models.Transaction || mongoose.model("TransactionModel", transactionSchema);

// export default TransactionModel;


import mongoose from "mongoose";
import { Schema } from "mongoose";

// userId,
// plan,
// credits,
// amount,
// date

const transactionSchema = new Schema({
        userId : {
            type: String,
            required: true,
        },
        plan : {
            type: String,
            required: true,
        },
        credits : {
            type: Number,
            required: true,
        },
        amount : {
            type: Number,
            required: true,
        },
        date : {
            type : Date,
            default: Date.now,
        },
        payment : {
            type : Boolean,
            default : false,
        },
        razorpayOrderId: {
            type: String,
            default: null,
        },
        razorpayPaymentId: {
            type: String,
            default: null,
        },
        razorpaySignature: {
            type: String,
            default: null,
        }
    });

// use capitalized "User" for consistency
const TransactionModel = mongoose.models.Transaction || mongoose.model("TransactionModel", transactionSchema);

export default TransactionModel;

