import mongoose from 'mongoose';
import bcrypt from "mongoose-bcrypt";
// User schema
const schema: mongoose.Schema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
        bcrypt:true
    },
},
{ timestamps: true, strict: true, strictQuery: true }
);
schema.plugin(bcrypt)
export default mongoose.model('User', schema);
