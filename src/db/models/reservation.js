import mongoose, { Schema } from "mongoose";

const reservationSchema = new mongoose.Schema({
  showtimeId: { type: Schema.Types.ObjectId, ref: "Showtime", required: true },
  amount: { type: Number, required: true },
  orderId: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
});

const Reservation =mongoose.models.Reservation || mongoose.model("Reservation", reservationSchema);

export default Reservation;
