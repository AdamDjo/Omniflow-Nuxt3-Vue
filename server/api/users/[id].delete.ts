import UserModel from "~~/server/models/User.model"

export default defineEventHandler(async(e)=>{


 // get id from params
 const id = e.context.params.id;
// update book
try{
    await UserModel.findByIdAndDelete(id)
    return {
        status:200,
        statusMessage:'user deleted successfully'
       }
} catch (error) {
    console.log(error);
    return error
}

})