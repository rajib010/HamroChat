import { asyncHandler, ApiError, ApiResponse, generateTokenAndSetCookie } from "../utility/index.js"
import { User } from "../model/user.model.js"
import bcrypt from "bcryptjs"



const signup = asyncHandler(async (req, res) => {
    const { fullName, userName, email, password, confirmPassword, gender } = req.body;
    if (confirmPassword != password) {
        throw new ApiError(400, "passwords donot match");
    }
    const user = await User.findOne({ $or: [{ userName }, { email }] })
    if (user) {
        throw new ApiError(400, "Username or email already exits")
    }
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}` // select dynamic profile pics
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`

    const salt = await bcrypt.genSalt(10) //hash the passwords
    const hashPassword = await bcrypt.hashPassword(password, salt)

    const newUser = await User.create({
        fullName,
        userName,
        email,
        password: hashPassword,
        gender,
        profilePic: gender === "male" ? boyProfilePic : girlProfilePic
    })
    if (newUser) {
        generateTokenAndSetCookie(newUser?._id, res);    
        return res.status(201).json(new ApiResponse(201, {
            _id: newUser._id,
            fullName: newUser.fullName,
            userName: newUser.userName,
            email: newUser.email,
            gender: newUser.gender,
            profilePic: newUser.profilePic
        }, "user created successfully"))
    }
})



export { signup }