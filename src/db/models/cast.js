import mongoose from 'mongoose';
const castSchema = new mongoose.Schema({
    name: { type: String},
    character: { type: String},
    image: { type: String}
  });
  const Cast=mongoose.models.Cast || mongoose.model('Cast',castSchema)
  export default Cast;