// import axios from 'axios'
// import userModel from '../models/userModel.js'
// import FormData from 'form-data'

// export const generateImage = async (req, res) => {
//     try {

//         const { prompt } = req.body
//         const userId = req.userId   // ✅ take from auth middleware

//         if (!userId || !prompt) {
//             return res.json({
//                 success: false,
//                 message: "Missing Details"
//             })
//         }

//         const user = await userModel.findById(userId)
//         if (!user) {
//             return res.status(404).json({ success: false, message: "User not found" })
//         }

//         if (user.creditBalance === 0 || user.creditBalance < 0) {
//             return res.json({
//                 success: false,
//                 message: "No Credit Balance",
//                 creditBalance: user.creditBalance
//             })
//         }

//         const formData = new FormData()
//         formData.append('prompt', prompt)

//         if (!process.env.CLIPDROP_API) {
//             console.error("❌ CLIPDROP_API not set in .env")
//             return res.status(500).json({ success: false, message: "Server misconfiguration" })
//         }

//         const { data } = await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
//             headers: {
//                 'x-api-key': process.env.CLIPDROP_API,
//                 ...formData.getHeaders()
//             },
//             responseType: 'arraybuffer'
//         })

//         const base64Image = Buffer.from(data, 'binary').toString('base64')

//         const resultImage = `data:image/png;base64,${base64Image}`

//         await userModel.findByIdAndUpdate(user._id, {
//             creditBalance: user.creditBalance - 1
//         })

//         res.json({
//             success: true,
//             message: "Imaeg Generated ",
//             creditBalance: user.creditBalance - 1,
//             resultImage
//         })

//     } catch (error) {
//         console.log(error)
//         res.json({
//             success: false,
//             message: error.message
//         })
//     }
// }

// import axios from "axios";
// import FormData from "form-data";
// import userModel from "../models/userModel.js";

// export const generateImage = async (req, res) => {
//     try {
//         const { prompt } = req.body;
//         const userId = req.userId;

//         if (!userId || !prompt) {
//             return res.json({
//                 success: false,
//                 message: "Missing Details",
//             });
//         }

//         const user = await userModel.findById(userId);
//         if (!user) {
//             return res.status(404).json({ success: false, message: "User not found" });
//         }

//         if (user.creditBalance <= 0) {
//             return res.json({
//                 success: false,
//                 message: "No Credit Balance",
//                 creditBalance: user.creditBalance,
//             });
//         }

//         // ✅ build form-data
//         const formData = new FormData();
//         formData.append("prompt", prompt);

//         console.log("Calling ClipDrop API with prompt:", prompt);

//         const response = await axios.post(
//             "https://clipdrop-api.co/text-to-image/v1",
//             formData,
//             {
//                 headers: {
//                     "x-api-key": process.env.CLIPDROP_API, // must exist
//                     ...formData.getHeaders(),
//                 },
//                 responseType: "arraybuffer",
//                 timeout: 20000, // prevent hanging
//             }
//         );

//         // ✅ convert to base64
//         const base64Image = Buffer.from(response.data, "binary").toString("base64");
//         const resultImage = `data:image/png;base64,${base64Image}`;

//         // ✅ update credits
//         user.creditBalance -= 1;
//         await user.save();

//         res.json({
//             success: true,
//             message: "Image Generated",
//             creditBalance: user.creditBalance,
//             resultImage,
//         });
//     } catch (error) {
//         console.error("Generate Image Error:", {
//             status: error.response?.status,
//             data: error.response?.data?.toString(),
//             message: error.message
//         });

//         res.status(500).json({
//             success: false,
//             message: error.response?.data?.toString() || error.message,
//         });
//     }
// };



import axios from 'axios';
import userModel from '../models/userModel.js';
import FormData from 'form-data';

export const generateImage = async (req, res) => {
    try {
        const { prompt } = req.body;
        const userId = req.userId; // ✅ from auth middleware

        if (!userId || !prompt) {
            return res.json({
                success: false,
                message: "Missing Details"
            });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user.creditBalance <= 0) {
            return res.json({
                success: false,
                message: "No Credit Balance",
                creditBalance: user.creditBalance
            });
        }

        if (!process.env.CLIPDROP_API) {
            console.error("❌ CLIPDROP_API not set in .env");
            return res.status(500).json({ success: false, message: "Server misconfiguration" });
        }

        // ✅ build form-data
        const formData = new FormData();
        formData.append("prompt", prompt);

        console.log("📡 Calling ClipDrop API with prompt:", prompt);

        const response = await axios.post(
            "https://clipdrop-api.co/text-to-image/v1",
            formData,
            {
                headers: {
                    "x-api-key": process.env.CLIPDROP_API,
                    ...formData.getHeaders(),
                },
                responseType: "arraybuffer",
                timeout: 20000, // ⏱ 20s timeout
            }
        );

        // ✅ convert to base64
        const base64Image = Buffer.from(response.data, "binary").toString("base64");
        const resultImage = `data:image/png;base64,${base64Image}`;

        // ✅ update credits
        user.creditBalance -= 1;
        await user.save();

        res.json({
            success: true,
            message: "Image Generated",
            creditBalance: user.creditBalance,
            resultImage,
        });

    } catch (error) {
        if (error.code === 'ECONNRESET') {
            console.error("❌ Connection was reset — likely API key / network issue");
        }

        console.error("ClipDrop API Error Details:", {
            code: error.code,
            status: error.response?.status,
            message: error.message,
            data: error.response?.data?.toString(),
        });

        res.status(500).json({
            success: false,
            message: error.response?.data?.toString() || error.message,
        });
    }
};
