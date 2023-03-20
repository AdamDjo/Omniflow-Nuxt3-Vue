import UserModel from "~~/server/models/User.model"

export default defineEventHandler(async(e)=>{
 // get data from body
    const body = await readBody(e)
   
// create body
    try {
   await UserModel.create(body);
   return {
    status:200,
    statusMessage:'user Added'
   }

    } catch (error) {
        console.log(error);
        return {
            error,
            status:500,
            statusMessage:'Error on adding user'
            
        }
    }

})