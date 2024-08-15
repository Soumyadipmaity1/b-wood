"use server";

import mongoose from "mongoose";
import Movie from "../db/models/movie.js";
import connectDB from "../db/database.js";

// Create a new movie
export const newMovie = async (data) => {
  await connectDB()

  console.log(data);
  try {
    const movie = new Movie(data);
    await movie.save();
    return movie;
  } catch (error) {
    console.error(error);
  }
};

// Get all movies
export const getMovies = async (data) => {
  await connectDB()

  try {
    const movies = await Movie.find();
    return movies;
  } catch (error) {
    console.error(error);
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
