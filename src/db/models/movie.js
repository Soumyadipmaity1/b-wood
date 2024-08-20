import mongoose,{Schema} from "mongoose";

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  images: [{ type: String }],
  languages: { type: String, enum: ["Hindi", "English"] },
  genre: { type: String, enum: ["thriller", "romantic", "horror"] },
  release_date: { type: Date, required: true },
  cast: [{type:Schema.Types.ObjectId, ref: 'Cast', default: null }],
  description: { type: String, required: true },
  duration: { type: String },
});

const Movie = mongoose.models.Movie || mongoose.model("Movie", MovieSchema);
export default Movie;
