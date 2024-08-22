"use server";
import connectDB from "../db/database.js";
import Theater from "../db/models/theater.js";
import mongoose from "mongoose"; // Ensure mongoose is imported
import Showtime from "../db/models/showtime.js"

export const createTheater = async (data) => {
  await connectDB();

  try {
    console.log(data);
    const movieIdString = data.get('movieId');
    const movieId = new mongoose.Types.ObjectId(movieIdString);
    const theater = new Theater({
      name: data.get('name'),
      city: data.get('city'),
      image: data.get('image'),
      movieId: movieId,
    });

    await theater.save();
    return theater.toObject();
  } catch (error) {
    console.error('Error creating theater:', error.message);
    throw error;
  }
};



export const createShowtime=async(data,id)=>{
    await connectDB()
  try {
    console.log(data);
    const newShowtimes = await Promise.all(data.map(async (item) => {
        const showtime = new Showtime({
            startAt: item.startAt,
            endAt: item.endAt,
            price: item.price,
            theaterId: id,
            movieId: item.moviesId,
        });
        const res = await showtime.save();
        return res;
      }));
      console.log(newShowtimes);
      return newShowtimes;
  }catch(error){
    console.log(error);
  }
}

export const getAllTheater=async()=>{
  await connectDB();
  try {
    const theater=await Theater.find().lean();
    return theater;
  } catch (error) {
    console.log(error);
  }
}

export const getTheaterById=async(id)=>{
  await connectDB();
  try {
    const res=await Theater.findById(id).lean();
    return res;
  } catch (error) {
    console.log(error);
  }
}

export const getShowtimeBytheaterId=async(id)=>{
  await connectDB();
  try {
    const res=await Showtime.find({theaterId:id}).lean();
    return res;
  } catch (error) {
    console.log(error);
  }
}

export const deleteTheaterBy=async(id)=>{
  await connectDB();
  try {
    await Showtime.deleteMany({theaterId:id});
    await Theater.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
  }
}

export const updateTheaterById = async (id, data) => {
  await connectDB();
  try {
    const movieId = data.get('movieId')
      ? data.get('movieId').map(id => new mongoose.Types.ObjectId(id))
      : undefined;
  
    const updatedData = {
      name: data.get('name'),
      city: data.get('city'),
      image: data.get('image'),
    
    };
    console.log(updatedData);
    const res = await Theater.findByIdAndUpdate(id, updatedData, { new: true }).lean();
    return res;
  } catch (error) {
    console.log(error);
    // throw error;  // Re-throw the error to handle it in the caller function if needed
  }
};