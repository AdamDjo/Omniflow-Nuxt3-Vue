import ProductModel from "~~/server/models/Product.model"
import { defineEventHandler } from 'h3';
export default defineEventHandler(async(e)=>{


 // get id from params
 const id = e.context.params.id;
// update book
try{
    await ProductModel.findByIdAndDelete(id)
    return {
        status:200,
        products:'product deleted successfully'
       }
} catch (error) {
    console.log(error);
    return error
}

})