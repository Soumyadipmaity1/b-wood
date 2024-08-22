import mongoose, { Schema } from "mongoose";

const TheatersSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  image: { type: String },
  movieId: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
});
const Theater = mongoose.models.Theater || mongoose.model("Theater", TheatersSchema);
export default Theater;
