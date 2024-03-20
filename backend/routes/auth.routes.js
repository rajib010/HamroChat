import express, {Router} from "express"
import { login, signup, logout } from "../controllers/auth.controllers.js";

const authRouter = Router();

authRouter.post("/signup", signup)
authRouter.post("/login", login)
authRouter.post("/logout", logout)


export default authRouter
