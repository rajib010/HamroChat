import { asyncHandler, ApiResponse } from "../utility/index.js";
import { User } from "../model/user.model.js"

const getUsersForSideBar = asyncHandler(async (req, res) => {
    const loggedInUserId = req.user?._id
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password")
    return res.status(200).json(new ApiResponse(200, { filteredUsers }, "available users fetched successfully"))
})

export { getUsersForSideBar }