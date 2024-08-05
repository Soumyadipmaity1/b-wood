import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    role:{type:String, required:true,enum:['user','admin']},
    phone:{type:String},
    reservation: [{ type: mongoose.Schema.ObjectId, ref: 'Reservation', default: null }],
    toBeWatched:[{type:mongoose.Schema.ObjectId, ref:'Movie'}]
})

const User=mongoose.models.User || mongoose.model("User",UserSchema);
export default User;