import express, {Router} from "express"

const authRouter = Router();

authRouter.get("/login",(req,res)=>{
    return res.send("login route")
})


export default authRouter
