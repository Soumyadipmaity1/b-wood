"use server";
import User from "../db/models/user.js";
import connectDB from "../db/database.js";

export const getUser = async () => {
    await connectDB();
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch users");
    }
};


export const getUserById = async (id) => {
    await connectDB();
    try {
        const user = await User.findById(id).lean();
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch user");
    }
};

export const createUser = async (data) => {
    await connectDB();
    try {
        const user = new User(data);
        console.log(data);
        await user.save();
        return user;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to create user");
    }
};

export const updateUser = async (id, data) => {
    await connectDB();
    try {
        const user = await User.findByIdAndUpdate(id, data, { new: true, runValidators: true }).lean();
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to update user");
    }
};

export const deleteUser = async (id) => {
    await connectDB();
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            throw new Error("User not found");
        }
        return { message: "User deleted successfully" };
    } catch (error) {
        console.error(error);
        throw new Error("Failed to delete user");
    }
};
