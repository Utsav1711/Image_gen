// import userModel from "../models/userModel.js"; 
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken'  
// import mongoose from "mongoose";

// const registerUser = async (req,res)=>{
//     try {
//         const {name,email,password} = req.body;

//         if(!name || !email || !password){
//             return res.json({
//                 sucess : false ,
//                 message : "Missing Details "
//             })
//         }

//         const salt = await bcrypt.genSalt(10)
//         const hashedPassword = await bcrypt.hash(password,salt)

//         const userData =  {
//             name,
//             email,
//             password : hashedPassword
//         }

//         const newUser = new userModel(userData)
//         const user = new newUser.save()

//         const token = jwt.sign({id : user._id} , process.env.JWT_SECRET)

//         res.json({
//             sucess : true,
//             token,
//             user : {
//                 name : user.name 
//             }
//         })

//     } catch (error) {
//         console.log(error)
//         res.json({
//             sucess : false,
//             message : error.message
//         })
//     }
// }


// const loginUser = async (req,res)=>{
//     try {
//         const {email,password} = req.body;

//         const user = await userModel.findOne({email})

//         if(!user){
//             return res.json({
//                 sucess : false ,
//                 message : "User Does Not exits"
//             })
//         }

//         const isMatch = await bcrypt.compare(password,user.password)

//         if(isMatch){
//             const token = jwt.sign({id : user._id} , process.env.JWT_SECRET)

//             res.json({
//                 sucess : true,
//                 token,
//                 user : {
//                     name : user.name 
//                 }
//             })
//         }
//         else{
//             return res.json({
//                 sucess : false ,
//                 message : "Invalide Credentials"
//             })
//         }

//     } catch (error) {
//         console.log(error)
//         res.json({
//             sucess : false,
//             message : error.message
//         })
//     }
// }


// export {registerUser,loginUser}

// import userModel from "../models/userModel.js";
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';

// const registerUser = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;

//         if (!name || !email || !password) {
//             return res.json({
//                 success: false,
//                 message: "Missing Details"
//             });
//         }

//         // hash password
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         // prepare user data
//         const userData = {
//             name,
//             email,
//             password: hashedPassword
//         };

//         // create and save user
//         const newUser = new userModel(userData);
//         const user = await newUser.save();   // ✅ FIXED

//         // generate token
//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

//         res.json({
//             success: true,
//             token,
//             user: {
//                 name: user.name
//             }
//         });

//     } catch (error) {
//         console.log(error);
//         res.json({
//             success: false,
//             message: error.message
//         });
//     }
// };

// const loginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         const user = await userModel.findOne({ email })

//         if (!user) {
//             return res.json({
//                 sucess: false,
//                 message: "User Does Not exits"
//             })
//         }

//         const isMatch = await bcrypt.compare(password, user.password)

//         if (isMatch) {
//             const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

//             res.json({
//                 sucess: true,
//                 token,
//                 user: {
//                     name: user.name
//                 }
//             })
//         }
//         else {
//             return res.json({
//                 sucess: false,
//                 message: "Invalide Credentials"
//             })
//         }

//     } catch (error) {
//         console.log(error)
//         res.json({
//             sucess: false,
//             message: error.message
//         })
//     }
// }

// const userCredits = async (req, res) => {
//     try {
//         const userId  = req.userId

//         const user = await userModel.findById(userId)
//         res.json({
//             sucess: true,
//             credits:user.creditBalance,
//             user: {
//                 name: user.name
//             }
//         })

//     } catch (error) {
//         console.log(error)
//         res.json({
//             sucess: false,
//             message: error.message
//         })
//     }   
// }
// export { registerUser, loginUser ,userCredits}


import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

export { registerUser, loginUser, userCredits };
