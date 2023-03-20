import UserModel from "~~/server/models/User.model"

export default defineEventHandler(async(e)=>{

    try{
        const user =  await UserModel.find({})
        return {
            status:200,
            statusMessage: user
           }
    }catch(err){
        console.log(err)
    }
})