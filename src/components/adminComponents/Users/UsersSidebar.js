"use client";
import React, { useEffect, useState } from "react";
import { FaTimes, FaEye, FaEyeSlash } from "react-icons/fa";
import {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
} from "../../../actions/user";

const UsersSidebar = ({ isOpen, onClose, mode, userId }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: null,
    phone: "",
  });

  const roleOptions = [
    { label: "Choose the Role", value: "null" },
    { label: "Admin", value: "admin" },
    { label: "User", value: "user" },
  ];

  const [role, setRole] = useState("null");
  const [showPassword, setShowPassword] = useState(false);

  const handleRole = (e) => {
    setRole(e.target.value);
    setUser({ ...user, role: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      if (userId) {
        const user = await getUserById(userId);
        setUser(user);
      }
    };
    fetchUsers();
  }, [mode, userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mode === "add") {
      try {
        const newUser = await createUser(user);
        console.log("User created:", newUser);
        onClose();
      } catch (error) {
        console.error("Failed to create user:", error);
      }
    } else {
      const updatedUser = await updateUser(userId, user);
      console.log(updatedUser);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUser(userId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`fixed right-0 top-0 bottom-0 w-full lg:w-96 p-12 pt-14 bg-black z-[60] border-l-2 border-l-neon overflow-scroll scrollbar-hidden transition-transform duration-300 ${
        isOpen ? "transform translate-x-0" : "transform translate-x-full"
      }`}
    >
      <FaTimes
        className="absolute top-5 left-5 size-6 text-neon cursor-pointer"
        onClick={onClose}
      />
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label className="text-neon font-semibold">Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            placeholder="Enter the Name..."
            className="p-1 pl-3 w-full rounded-md text-black focus:ring-2 focus:ring-neon"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-neon font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Enter the email Id..."
            className="p-1 pl-3 w-full rounded-md text-black focus:ring-2 focus:ring-neon"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-neon font-semibold">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Enter the password..."
              className="p-1 pl-3 pr-10 w-full rounded-md text-black focus:ring-2 focus:ring-neon"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black focus:outline-none"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="role" className="text-neon font-semibold">
            Role
          </label>
          <select
            name="role"
            value={user.role}
            onChange={handleRole}
            className="text-black p-1 pl-3 rounded-md cursor-pointer focus:ring-2 focus:ring-neon"
          >
            {roleOptions.map((roleOption) => (
              <option key={roleOption.value} value={roleOption.value}>
                {roleOption.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-neon font-semibold">Phone No.</label>
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            placeholder="Enter the phone no..."
            className="p-1 pl-3 w-full rounded-md text-black focus:ring-2 focus:ring-neon"
          />
        </div>

        {mode === "add" ? (
          <div className="flex items-center justify-around pt-10">
            <button
              type="submit"
              className="bg-neon text-black py-2 px-5 font-bold rounded-md transition duration-150 ease-in-out hover:scale-110"
            >
              ADD USER
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-around gap-3 pt-10">
            <button
              type="submit"
              className="bg-neon text-black py-2 px-5 font-bold rounded-md transition duration-150 ease-in-out hover:scale-110"
            >
              UPDATE
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="bg-black border-2 border-neon text-neon py-2 px-5 font-bold rounded-md transition duration-150 ease-in-out hover:scale-110"
            >
              DELETE
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default UsersSidebar;
