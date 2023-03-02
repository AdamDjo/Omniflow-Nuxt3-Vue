import ProductModel from "~~/server/models/Product.model"

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