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
    console.log(newMovie);
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
    // Use .lean() to get plain JavaScript objects instead of Mongoose documents
    const movies = await Movie.find().lean();
    // console.log(movies);
    return movies;
  } catch (error) {
    console.log(error);
    // throw error;
  }
};


// Get a movie by ID
export const getMoviebyId = async (data) => {
  await connectDB()

  try {
    const movie = await Movie.findById(data.id);
    
    return movie;
  } catch (error) {
    console.error(error);
  }
};

// Update a movie by ID
export const updateMovie = async (data) => {
  await connectDB()

  try {
    const movie = await Movie.findByIdAndUpdate(data.id, data, {
      new: true,
      runValidators: true,
    });
    
    return movie;
  } catch (error) {
    console.error(error);
  }
};

// Delete a movie by ID
export const deleteMovie = async (data) => {
  await connectDB()

  try {
    const movie = await Movie.findByIdAndDelete(data.id);
    
    return ({ message: "Movie deleted successfully" });
  } catch (error) {
    console.error(error);
  }
};
