import UserModel from "~~/server/models/User.model"

export default defineEventHandler(async(e)=>{
    try{
        const products =  await UserModel.find({})
        return {
            status:200,
            statusMessage: products
           }
    }catch(err){
        console.log(err)
    }

})