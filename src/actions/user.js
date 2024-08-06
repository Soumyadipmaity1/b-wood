"use server"
import User from "../db/models/user.js"
import connectDB from '../db/database.js'

export const getUser=async ()=>{
    await connectDB()
    try {
        const user = await User.find();
        return user
    } catch (error) {
        console.error(error)
        throw new Error("Failed to fetch user")
    }
}

export const createUser=async(data)=>{
    await connectDB()
    try {
        const user = new User(data)
        await user.save()
        return user
    } catch (error) {
        console.error(error)
        throw new Error("Failed to create user")
    }
}