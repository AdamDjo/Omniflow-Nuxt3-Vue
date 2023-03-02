import ProductModel from "~~/server/models/Product.model"

export default defineEventHandler(async(e)=>{
// get data from body
 const body = await readBody(e)

 // get id from params
 const id = e.context.params.id;
// update book
try{
    await ProductModel.findByIdAndUpdate(id,body)
    return {
        status:200,
        statusMessage:'product updated successfully'
       }
} catch (error) {
    console.log(error);
    return error
}

})