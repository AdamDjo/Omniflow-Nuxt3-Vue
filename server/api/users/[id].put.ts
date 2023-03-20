import UserModel from "~~/server/models/User.model"

export default defineEventHandler(async(e)=>{
// get data from body
 const body = await readBody(e)

 // get id from params
 const id = e.context.params.id;
// update book
try{
    await UserModel.findByIdAndUpdate(id,body)
    return {
        status:200,
        statusMessage:'user updated successfully'
       }
} catch (error) {
    console.log(error);
    return error
}

})