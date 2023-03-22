import UserModel from "~~/server/models/User.model"
import jwt from 'jsonwebtoken';
import { setCookie } from 'h3'

export default defineEventHandler(async (e) => {
    try{

   
    setCookie(e,'jwt','',{
        maxAge:0
    })
    return {
        code: "ok",
        message: "SUCESS.",
      };
    }catch(Err){
        console.dir(Err);
        e.res.statusCode = 500;
        return {
          code: "ERROR",
          message: "Something wrong.",
        };
      }
})