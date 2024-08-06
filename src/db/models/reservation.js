import mongoose, { Schema } from "mongoose";

const reservationSchema = new mongoose.Schema({
  theaterId: { type: Schema.Types.ObjectId, ref: "Theater", required: true },
  amount: { type: Number, required: true },
  orderId: { type: String, required: true },
  createdAt: { type: Date, required: true },
});

const Reservation =mongoose.models.Reservation || mongoose.model("Reservation", reservationSchema);

export default Reservation;
