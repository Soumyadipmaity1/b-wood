"use server";
import Movie from "../db/models/movie.js";
import connectDB from "../db/database.js";
import Cast from '../db/models/cast.js'

export const newMovie = async (data,cast) => {
  await connectDB()
  try {

    const castIds = await Promise.all(cast.map(async (item) => {
      const newCast = new Cast({
        name: item.name,
        character: item.character,
        image: item.image,
      });
      const res = await newCast.save();
      return res._id; // Return the ObjectId of the saved cast member
    }));
    const newMovie=new Movie({
      title:data.get('title'),
      images:data.get('images'),
      languages:data.get('languages'),
      genre:data.get('genre'),
      release_date:new Date(data.get('release_date')),
      cast:castIds,
      description:data.get('description'),
      duration:data.get('duration'),
    });
    await newMovie.save();
    return newMovie.toObject();
  } catch (error) {
    console.error(error);
  }
};

// Get all movies
export const getMovies = async () => {
  await connectDB();
  try {
    const movies = await Movie.find();
    return {result:movies};
  } catch (error) {
    console.log(error);
    // throw error;
  }
};


// Get a movie by ID
export const getMoviebyId = async (data) => {
  await connectDB()
  try {
    const movie = await Movie.findById(data).lean();
    console.log("this is movie",movie);
    return movie;
  } catch (error) {
    console.error(error);
  }
};
export const getCastById = async (data) => {
  await connectDB()
  try {
    const cast = await Cast.findById(data).lean();
    console.log("this is cast",cast);
    return cast;
  } catch (error) {
    console.error(error);
  }
};

// Update a movie by ID
export const updateMoviebyId = async (id,data,cast) => {
  await connectDB()
  try {
    // const castIds = await Promise.all(cast.map(async (item) => {
    //   // const existCast=await Cast.findById(item);
    //   // if(existCast){
    //   //   return existCast._id;
    //   // }
    //   const newCast = new Cast({
    //     name: item.name,
    //     character: item.character,
    //     image: item.image,
    //   });
    //   const res = await newCast.save();
    //   return res._id;
    // }));
      // console.log(data);
      // console.log(cast);
    const updatedMovie={
      title:data.get('title'),
      images:data.get('images'),
      languages:data.get('languages'),
      genre:data.get('genre'),
      release_date:new Date(data.get('release_date')),
      // cast:castIds,
      description:data.get('description'),
      duration:data.get('duration'),
    }
    const movie = await Movie.findByIdAndUpdate(
      id, updatedMovie,{new:true}).lean();
    return movie;
  } catch (error) {
    console.error(error);
  }
};

// Delete a movie by ID
export const deleteMoviebyId = async (data) => {
  await connectDB()

  try {
    await Movie.findByIdAndDelete(data);
    return ({ message: "Movie deleted successfully" });
  } catch (error) {
    console.error(error);
  }
};

export const getAllMovieIds=async()=>{
  try {
    const movies = await Movie.find({}, '_id title'); // Retrieve both _id and title fields
    const movieData = movies.map(movie => ({ id: movie._id, title: movie.title })); // Map to an array of objects with id and title
    console.log(movieData);
    return movieData;
  } catch (error) {
    console.log(error);
  }
}