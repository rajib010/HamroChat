import { Jwt } from "jsonwebtoken";
import { asyncHandler, ApiError, ApiResponse } from "./index.js"

const generateTokenAndSetCookie = asyncHandler(async (userId, res) => {
    const token = await jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
        expiresIN: '15d'
    })

    await res.cookie("jwtToken", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, //MS
        httpOnly: true, //prevent Xss attack
        sameSite: "strict",
        secure: process.env.NODE_ENV !=="development"
    })
})

export default generateTokenAndSetCookie