"use client";

import { useEffect, useState } from "react";
import { FaPencil } from "react-icons/fa6";
import { auth } from "../../firebase/firebase";

export default function Profile() {
  const [user, setUser] = useState({
    image: "",
    name: "John Doe",
    username: "johndoe",
    email: "johndoe@example.com",
    phone: "+91641218492",
    gender: "Male",
    tickets: [
      { id: 1, movie: "Inception", date: "2024-09-01", seat: "A1" },
      { id: 2, movie: "Interstellar", date: "2024-09-15", seat: "B4" },
    ],
  });

  useEffect(()=>{
    const user=auth.currentUser
    console.log(user)
  },[])
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateProfile = () => {
    alert("Profile updated successfully!");
  };

  const handleDeleteProfile = () => {
    alert("Profile deleted successfully!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center mt-20 ">
      <div className="p-10 rounded-xl shadow-lg w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-lime-300 text-center  mb-8">User Profile</h2>
        <div className="flex flex-col items-center">
          <div className="relative mb-6">
            {user.image ? (
              <img
                src={user.image}
                alt="User Profile"
                className="w-24 h-24 rounded-full border-4 border-purple-500"
              />
            ) : (
              <div className="w-24 h-24 relative rounded-full border-4 border-lime-500 flex items-center justify-center bg-gray-200 text-gray-500 text-xl">
                Add Image
                <button className="absolute -bottom-1 -right-1 rounded-full p-1 text-black bg-neon flex items-center justify-center border-2 border-neon transition duration-150 ease-in-out hover:scale-110">
                  <FaPencil className="size-4" />
                </button>
              </div>
            )}
          </div>
          <div className="mb-6 w-full">
            <label className="block text-gray-100 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={user.name}
              onChange={handleInputChange}
              className="w-full p-3  bg-gray-800  rounded-lg shadow-sm   focus:ring-1 focus:ring-lime-300"
            />
          </div>
          <div className="mb-6 w-full">
            <label className="block text-gray-1 00 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={user.username}
              onChange={handleInputChange}
              className="w-full p-3  bg-gray-800  rounded-lg shadow-sm   focus:ring-1 focus:ring-lime-300"
            />
          </div>
          <div className="mb-6 w-full">
            <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={user.email}
              onChange={handleInputChange}
              className="w-full p-3  bg-gray-800  rounded-lg shadow-sm   focus:ring-1 focus:ring-lime-300"
            />
          </div>
          <div className="mb-6 w-full">
            <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="email">
              Mobile Number
            </label>
            <input
              id="phone"
              name="phone"
              type="phone"
              value={user.phone}
              onChange={handleInputChange}
              className="w-full p-3  bg-gray-800  rounded-lg shadow-sm   focus:ring-1 focus:ring-lime-300"
            />
          </div>
          <div className="mb-6 w-full">
            <label className="block text-gray-600 text-sm font-bold mb-2" htmlFor="gender">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={user.gender}
              onChange={handleInputChange}
              className="w-full p-3  bg-gray-800  rounded-lg shadow-sm   focus:ring-1 focus:ring-lime-300"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="flex justify-between w-full mb-8">
            <button
              onClick={handleUpdateProfile}
              className="bg-lime-400 text-black py-2 px-6 rounded-lg shadow-lg hover:bg-lime-600 transition-colors"
            >
              Update Profile
            </button>
            <button
              onClick={handleDeleteProfile}
              className="bg-orange-500 text-black py-2 px-6 rounded-lg shadow-lg hover:bg-orange-600 transition-colors"
            >
              Delete Profile
            </button>
          </div>
          <div className="w-full">
            <h3 className="text-xl font-bold text-white mb-4">Tickets Booked</h3>
            {user.tickets.length > 0 ? (
              user.tickets.map((ticket) => (
                <div key={ticket.id} className="border p-4 mb-4 rounded-lg shadow-sm bg-gray-800">
                  <p>
                    <strong>Movie:</strong> {ticket.movie}
                  </p>
                  <p>
                    <strong>Date:</strong> {ticket.date}
                  </p>
                  <p>
                    <strong>Seat:</strong> {ticket.seat}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No tickets booked yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
