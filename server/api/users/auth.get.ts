import { getCookie } from 'h3'
import UserModel from "~~/server/models/User.model"
import jwt from 'jsonwebtoken';
export default defineEventHandler(async (e) => {
    try{
    
    const cookie= getCookie(e,'jwt')
    console.log(cookie)
    const claims=jwt.verify(cookie,'mysecrettoken')
    if(!claims){
        e.res.statusCode = 401;
        return {
          code: "invalid credentials",
          message: "unauthenticated.",
        };
    }
    const user= await UserModel.findOne({_id:claims._id})
    const {password,...data} = await user?.toJSON()
    return(data)
}catch(Err){
    e.res.statusCode = 401;
        return {
          code: "invalid credentials",
          message: "unauthenticated.",
        };
  }
})