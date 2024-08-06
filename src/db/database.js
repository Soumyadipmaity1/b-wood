import mongoose from "mongoose";

const connectDB = async () => {

    if(mongoose.connection.readyState){
        return true;
    }
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("MongoDB connected");
    } catch (error) {
        console.log("Error connecting",error)
    }
}
export default connectDB;