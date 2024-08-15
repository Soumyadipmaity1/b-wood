"use server"
import Movie from "../db/models/movie.js"
import connectDB from '../db/database.js'

export const getAllMovie=async ()=>{
    await connectDB()
    try {
        const movies = await Movie.find();
        return movies
    } catch (error) {
        console.error(error)
        throw new Error("Failed to fetch movie")
    }
}

export const createUser=async(data)=>{
    await connectDB()
    try {
        const movie = new Movie(data)
        await movie.save()
        return user
    } catch (error) {
        console.error(error)
        throw new Error("Failed to create movie")
    }
}