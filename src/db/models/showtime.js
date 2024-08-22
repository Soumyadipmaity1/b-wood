import mongoose, { Schema } from "mongoose";

const showtime = new mongoose.Schema({
    startAt:{type:String},
    endAt:{type:Date},
    available_seats:[{type:String}],
    price:{type:Number},
    reserved_seats:[{type:String}],
    movieId:{type:Schema.Types.ObjectId, ref:'Movie'},
    theaterId:{type:Schema.Types.ObjectId, ref:'Theater'}
})

const Showtime = mongoose.models.Showtime || mongoose.model('Showtime',showtime);
export default Showtime