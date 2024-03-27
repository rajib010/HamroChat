import express, { Router } from "express"
import verifyUser from "../middlewares/verifyUser.js"
import { getUsersForSideBar } from "../controllers/user.controllers.js";

const userRouter = new Router();

userRouter.get("/", verifyUser, getUsersForSideBar);


export default userRouter