import ProductModel from "~~/server/models/Product.model"
import { defineEventHandler } from 'h3';
export default defineEventHandler(async(e)=>{
    try{
        const products =  await ProductModel.find({})
        return {
            status:200,
            statusMessage: products
           }
    }catch(err){
        console.log(err)
    }

})