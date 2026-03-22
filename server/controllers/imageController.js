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
