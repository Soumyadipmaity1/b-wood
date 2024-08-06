import mongoose, { Schema } from "mongoose";

const UserSchema=new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    role:{type:String, required:true,enum:['user','admin']},
    phone:{type:String},
    reservation: [{ type: Schema.Types.ObjectId, ref: 'Reservation', default: null }],
    toBeWatched:[{type:Schema.Types.ObjectId, ref:'Movie'}]
})

const User=mongoose.models.User || mongoose.model("User",UserSchema);
export default User;