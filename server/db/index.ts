import{Nitro} from 'nitropack'
import mongoose from 'mongoose'
export default async(_nitroApp:Nitro) =>{
   const config = useRuntimeConfig()

        try{
            console.log(config.public.MongodbUri)
             await mongoose.connect(config.public.MongodbUri)
            console.log(`mongo database is connected!!!  `)
        }catch(error){
            console.error(`Error: ${error} `)
            process.exit(1) //passing 1 - will exit the proccess with error
        }
    
    
}