"use server";
import User from "../db/models/user.js";
import connectDB from "../db/database.js";
import Reservation from "../db/models/reservation.js";
import Showtime from "../db/models/showtime.js";
import Movie from "../db/models/movie.js";
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
        console.log(user)
        return user.toObject();
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



export const getUserDetails=async(email)=>{
    await connectDB();
    try {
        const user = await User.findOne({ email }).lean();
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch user by email");
    }
}
export const getUserbyEmail=async(email)=>{
    await connectDB();
    try {
        const user = await User.findOne({ email }).select("name email phone reservation -_id")
        .populate({
          path: "reservation",
          select:"showtimeId amount -_id",
          populate: {
            path: "showtimeId", // This is the field inside reservation that we want to populate
            model: "Showtime",
            select:"movieId startAt reserved_seats -_id",
            populate: {
              path: "movieId", // This is the field inside showtime that we want to populate
              model: "Movie",
              select:"title -_id"
            },
          },
        }).lean();        
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch user by email");
    }
}


export const updateUserByEmail = async(email,data) => {
    await connectDB();
    try {
        const user = await User.findOneAndUpdate({ email }, { $set: { phone: data } }, { new: true}).lean();
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    } catch (error) {
        console.log(error);
    }
}

export const deleteUserByEmail=async(email)=>{
    await connectDB();
    try {
        const user = await User.findOneAndDelete({ email });
        if (!user) {
            throw new Error("User not found");
        }
        return { message: "User deleted successfully" };
    } catch (error) {
        console.error(error);
        throw new Error("Failed to delete user by email");
    }
}