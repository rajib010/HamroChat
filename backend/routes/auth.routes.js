import express, {Router} from "express"

const authRouter = Router();

authRouter.get("/login",(req,res)=>{
    return res.send("login route")
})
authRouter.post("/signup",(req,res)=>{
    return res.send("signup route")
})
authRouter.post("/logout",(req,res)=>{
    return res.send("logout route")
})

export default authRouter
