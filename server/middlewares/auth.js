import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  try {
    let token = req.headers.token; // custom header
    if (!token && req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1]; // standard Bearer
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not Authorised. Login Again"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id) {
      return res.status(401).json({
        success: false,
        message: "Not Authorised. Login Again"
      });
    }

    req.userId = decoded.id; // ✅ controller can use req.userId
    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
};

export default userAuth;


// import jwt from 'jsonwebtoken';

// const userAuth = async (req, res, next) => {
//     const authHeader = req.headers.authorization;
//     const token = authHeader && authHeader.split(" ")[1];

//     if (!token) {
//         return res.status(401).json({
//             success: false,
//             message: "Not Authorized. Login Again"
//         });
//     }

//     try {
//         const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

//         if (tokenDecode.id) {
//             req.body.userID = tokenDecode.id;
//             next();
//         } else {
//             return res.status(401).json({
//                 success: false,
//                 message: "Not Authorized. Login Again"
//             });
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(401).json({
//             success: false,
//             message: "Invalid or expired token"
//         });
//     }
// };

// export default userAuth;
