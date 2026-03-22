// import userModel from "../models/userModel.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import razorpay from "razorpay";
// import TransactionModel from "../models/transaction.model.js";

// const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       return res.json({
//         success: false,
//         message: "Missing Details",
//       });
//     }

//     // check if email already exists
//     const existingUser = await userModel.findOne({ email });
//     if (existingUser) {
//       return res.json({
//         success: false,
//         message: "Email already registered. Please login instead.",
//       });
//     }

//     // hash password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // save user
//     const user = await userModel.create({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     // generate token
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });

//     res.json({
//       success: true,
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: "Server error: " + error.message,
//     });
//   }
// };

// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await userModel.findOne({ email });
//     if (!user) {
//       return res.json({
//         success: false,
//         message: "User does not exist",
//       });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.json({
//         success: false,
//         message: "Invalid Credentials",
//       });
//     }

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });

//     res.json({
//       success: true,
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: "Server error: " + error.message,
//     });
//   }
// };

// const userCredits = async (req, res) => {
//   try {
//     const userId = req.userId;
//     const user = await userModel.findById(userId);

//     if (!user) {
//       return res.json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     res.json({
//       success: true,
//       credits: user.creditBalance,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: "Server error: " + error.message,
//     });
//   }
// };

// const razorpayInstance = new razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// const paymentRazorpay = async (req, res) => {
//   try {

//     const { userId, planId } = req.body;

//     const userdata = await userModel.findById(userId);

//     if (!userdata || !planId) {
//       return res.json({
//         success: false,
//         message: "Missing Details",
//       });
//     }

//     let credits, plan, amount, date;
//     switch (planId) {
//       case 'Basic':
//         plan = "Basic";
//         credits = 100;
//         amount = 10;
//         break;

//       case 'Advanced':
//         plan = "Advanced";
//         credits = 500;
//         amount = 50;
//         break;

//       case 'Business':
//         plan = "Business";
//         credits = 5000;
//         amount = 250;
//         break;

//       default:
//         return res.json({
//           success: false,
//           message: "Invalid Plan",
//         });
//     }

//     date = Date.now();

//     const transactionData = {
//       userId,
//       plan,
//       credits,
//       amount,
//       date,
//     }
//     // Store transaction data in MongoDB
//     const newTransaction = await TransactionModel.create(transactionData);

//     const options = {
//       amount: amount * 100, // amount in paise
//       currency: process.env.CURRENCY || "INR",
//       receipt: `receipt_${newTransaction._id}`,
//     };

//     // Razorpay order creation
//     await razorpayInstance.orders.create(options, (err, order) => {
//       if (err) {
//         console.log(err);
//         return res.json({
//           success: false,
//           message: "Razorpay order creation failed",
//         });
//       }
//       // Error avi sake 
//       res.json({ sucess: true, order });
//     });

//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: "Server error: " + error.message,
//     });
//   }
// }

// export { registerUser, loginUser, userCredits, paymentRazorpay };



import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import razorpay from "razorpay";
import crypto from "crypto";
import TransactionModel from "../models/transaction.model.js";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: "Missing Details",
      });
    }

    // check if email already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({
        success: false,
        message: "Email already registered. Please login instead.",
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // save user
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    // generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error: " + error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User does not exist",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error: " + error.message,
    });
  }
};

const userCredits = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      credits: user.creditBalance,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error: " + error.message,
    });
  }
};

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Frontend → request payment
//         ↓
// paymentRazorpay() → create order
//         ↓
// User pays via Razorpay
//         ↓
// Frontend gets response
//         ↓
// verifyRazorpay() → verify payment
//         ↓
// Credits added to user

const paymentRazorpay = async (req, res) => {
  try {
    const userId = req.userId;
    const { planId } = req.body;

    const userdata = await userModel.findById(userId);

    if (!userdata || !planId) {
      return res.json({
        success: false,
        message: "Missing Details",
      });
    }

    let credits, plan, amount, date;
    switch (planId) {
      case 'Basic':
        plan = "Basic";
        credits = 100;
        amount = 10;
        break;

      case 'Advanced':
        plan = "Advanced";
        credits = 500;
        amount = 50;
        break;

      case 'Business':
        plan = "Business";
        credits = 5000;
        amount = 250;
        break;

      default:
        return res.json({
          success: false,
          message: "Invalid Plan",
        });
    }

    date = Date.now();

    const transactionData = {
      userId,
      plan,
      credits,
      amount,
      date,
    };

    // Store transaction data in MongoDB
    // Pending payment, so we will update the transaction later with payment details
    const newTransaction = await TransactionModel.create(transactionData);

    const options = {
      amount: amount * 100 * 96, // amount in paise
      currency: process.env.CURRENCY || "INR",
      receipt: `receipt_${newTransaction._id}`,
    };

    // Razorpay order creation
    const order = await razorpayInstance.orders.create(options);

    // update transaction with Razorpay order ID for later verification
    await TransactionModel.findByIdAndUpdate(newTransaction._id, {
      razorpayOrderId: order.id,
    });

    return res.json({ success: true, order });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error: " + error.message,
    });
  }
};

const verifyRazorpay = async (req, res) => {
  try {
    const userId = req.userId;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!userId || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Missing payment details",
      });
    }

    if (!process.env.RAZORPAY_KEY_SECRET) {
      return res.status(500).json({
        success: false,
        message: "Razorpay key secret is not configured",
      });
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }

    const transaction = await TransactionModel.findOne({
      userId,
      razorpayOrderId: razorpay_order_id,
    });

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    if (transaction.payment) {
      const existingUser = await userModel.findById(userId);
      return res.json({
        success: true,
        message: "Payment already verified",
        credits: existingUser?.creditBalance,
      });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.creditBalance += transaction.credits;
    await user.save();

    transaction.payment = true;
    transaction.razorpayPaymentId = razorpay_payment_id;
    transaction.razorpaySignature = razorpay_signature;
    await transaction.save();

    return res.json({
      success: true,
      message: "Payment verified and credits added",
      credits: user.creditBalance,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error: " + error.message,
    });
  }
};

export { registerUser, loginUser, userCredits, paymentRazorpay, verifyRazorpay };



