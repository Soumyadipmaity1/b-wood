import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  images: [{ type: String }],
  languages: { type: String, enum: ["Hindi", "English"] },
  genre: { type: String, enum: ["thriller", "romantic", "horror"] },
  release_date: { type: Date, required: true },
  cast: [
    {
      name: { type: String, required: true },
      character: { type: String, required: true },
      image: { type: String, required: true },
    },
  ],
  description: { type: String, required: true },
  duration: { type: String },
});

const Movie = mongoose.models.Movie || mongoose.model("Movie", MovieSchema);
export default Movie;
