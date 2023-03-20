import ProductModel from "~~/server/models/Product.model"
import { defineEventHandler } from 'h3';
export default defineEventHandler(async(e)=>{
 // get data from body
    const body = await readBody(e)
    
// create body
    try {
   await ProductModel.create(body);
   return {
    status:200,
    statusMessage:'product Added'
   }

    } catch (error) {
        console.log(error);
        return {
            error,
            status:500,
            statusMessage:'Error on adding product'
            
        }
    }

})