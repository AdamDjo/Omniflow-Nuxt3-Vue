import mongoose from 'mongoose';
// User schema
const schema: mongoose.Schema = new mongoose.Schema(
  {
    Nom: {
      type: String,
      required: true,
    },
    email: {
        type: String,
        required: true,
    },
    Role:{
        type: String,
        required: true,
    },
}
);
export default mongoose.model('User', schema);
