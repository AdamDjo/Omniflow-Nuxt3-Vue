import UserModel from "~~/server/models/User.model"
import jwt from 'jsonwebtoken';
import { setCookie } from 'h3'

export default defineEventHandler(async (e) => {
    console.log("POST /api/users/signin");
    const body = await readBody(e)
 // Check if email is passed.
 if (!body.email) {
    e.res.statusCode = 400;
    return {
      code: "EMAIL_REQUIRED",
      message: "Body malformed: email is required.",
    };
  }
  // Check if password is passed.
  if (!body.password) {
    e.res.statusCode = 400;
    return {
      code: "PASSWORD_REQUIRED",
      message: "Body malformed: password is required.",
    };
  }

  try{
    console.log("find user");
    const userData = await UserModel.findOne({
        email: body.email.toLowerCase(),
      });
      if (userData) {
        console.log("User found");
        const isPasswordValid = await userData.verifyPasswordSync(body.password);
        if (isPasswordValid) {
          const token: string = await jwt.sign({ _id:userData._id }, 'mysecrettoken');
          setCookie(e,'jwt',token,{
            httpOnly: false,
            maxAge:24*60*60*1000 //1day
          }),
          console.log(token)
          // Generate token or create session here
          return {
           
            message:'success'
          };
        } else {
          console.log("Password is not valid");
          e.res.statusCode = 404;
          return {
            code: "USER_NOT_FOUND",
            message: "User with given email and password doesn't exists.",
          };
        }
      } else {
        console.log("User not found");
        e.res.statusCode = 404;
        return {
          code: "USER_NOT_FOUND",
          message: "User with given email and password doesn't exists.",
        };
      }
  }catch(Err){
    console.dir(Err);
    e.res.statusCode = 500;
    return {
      code: "ERROR",
      message: "Something wrong.",
    };
  }
})