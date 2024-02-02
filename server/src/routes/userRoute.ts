import express,{Router} from 'express'
import Usercontroller from '../controller/Usercontroller'

const userRouter:Router = express.Router();

userRouter.post("/createuser",Usercontroller.createuser)
userRouter.post("/login",Usercontroller.login)

export = {
    userRouter
}