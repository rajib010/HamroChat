import express, {Router} from "express"
import { signup } from "../controllers/auth.controllers.js";

const authRouter = Router();

authRouter.get("/login",(req,res)=>{
    return res.send("login route")
})
authRouter.post("/signup", signup)
authRouter.post("/logout",(req,res)=>{
    return res.send("logout route")
})

export default authRouter
