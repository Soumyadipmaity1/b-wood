import mongoose, { Schema } from "mongoose";

const SeatSchema = new mongoose.Schema({
  seatNumber: { type: String, required: true },
  isReserved: { type: Boolean, default: false },
});

const TheatersSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  date: { type: Date, required: true },
  showtimes: [
    {
      seats: [SeatSchema],
      time: { type: String, required: true },
      price: { type: Number, required: true },
    },
  ],
  movieId: { type: Schema.Types.ObjectId, ref: "Movie", required: true },
});
const Theater = mongoose.models.Theater || mongoose.model("Theater", TheatersSchema);
export default Theater;
