import jwt from "jsonwebtoken"
import { ApiError, asyncHandler } from "../utility/index.js"
import { User } from "../model/user.model.js"

const verifyUser = asyncHandler(async (req, res, next) => {
    const token = req.cookies.jwtToken;
    if (!token) {
        throw new ApiError(400, "Unauthorized request")
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
        throw new ApiError(401, "Invalid token")
    }
    const user = await User.findById(decoded.userId).select("-password")
    if (!user) {
        throw new ApiError(404, "User not found")
    }
    req.user = user
    next();
})


export default verifyUser