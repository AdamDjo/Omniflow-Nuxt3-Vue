import mongoose from 'mongoose';
// product schema
const schema: mongoose.Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: false,
    },
    discountPercentage : {
        type: Number,
        required: false,
    },
    rating : {
        type: Number,
        required: false,
    },
    stock:{
        type: Number,
        required: false,
    },
    brand:{
        type: String,
        required: false,
    },
    category:{
        type: String,
        required: false,
    },
    thumbnail:{
        type: String,
        required: false,
    },
    images:{
        type: Array,
        required: false,
    }
  },
 
);


export default mongoose.model('Product', schema);
