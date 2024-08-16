"use client";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import TimeInput from "./TimeInput";
import { createCast, newMovie } from "../../../actions/movie";

const MoviesSidebar = ({ isOpen, onClose, mode }) => {
  const [formData, setFormData] = useState({
    title: "",
    poster: null,
    language: "",
    genre: "",
    release_date: "",
    description: "",
  },[]);
  const [time, setTime] = useState({ hours: '', minutes: '', seconds: '' });
  const languageOptions = [
    { label: "Choose the Language", value: "NULL" },
    { label: "Hindi", value: "Hindi" },
    { label: "English", value: "English" },
  ];

  const genreOptions = [
    { label: "Choose the Genre", value: "null" },
    { label: "Thriller", value: "thriller" },
    { label: "Romantic", value: "romantic" },
    { label: "Horror", value: "horror" },
  ];

  const [cast, setCast] = useState([{ name: "", character: "", image: null }]);
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };
  const handleCastChange =async (index, event) => {
    const { name, value, files } = event.target;
    const updatedCast = [...cast];
    if (files) {
      const base64 = await fileToBase64(files[0]);
      updatedCast[index][name] = base64;
    } else {
      updatedCast[index][name] = value;
    }
    setCast(updatedCast);
  };

  const addCastMember = () => {
    setCast([...cast, { name: "", character: "", image: null }]);
  };

  const removeCastMember = (index) => {
    const updatedCast = [...cast];
    updatedCast.splice(index, 1);
    setCast(updatedCast);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newtime=time.hours+"h "+time.minutes+'m '+time.seconds+"s ";
    const data = new FormData();
    data.append('title', formData.title);
    if (formData.poster) {
      const posterBase64 = await fileToBase64(formData.poster);
      data.append('images', posterBase64);
    }
    data.append('languages', formData.language);
    data.append('genre', formData.genre);
    data.append('release_date', formData.release_date);
    data.append('description', formData.description);
    data.append('duration', newtime);    
    try {
      const movie=await newMovie(data,cast);
      console.log("Movie created:", movie);
    } catch (error) {
      console.error("Error creating movie:", error.message);
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
          <label className="text-neon font-semibold">Title</label>
          <input
            type="text"
            placeholder="Enter the title..."
            className="p-1 pl-3 w-full rounded-md text-black focus:ring-2 focus:ring-neon"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-neon font-semibold">Poster</label>
          <input
            type="file"
            className="p-1 pl-3 w-64 rounded-md"
            onChange={(e) =>
              setFormData({ ...formData, poster: e.target.files[0] })
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-neon font-semibold">Language</label>
          <select
            value={formData.language}
            onChange={(e) =>
              setFormData({ ...formData, language: e.target.value })
            }
            className="text-black p-1 pl-3 rounded-md cursor-pointer focus:ring-2 focus:ring-neon"
          >
            {languageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="input" className="text-neon font-semibold">
            Genre
          </label>
          <select
            value={formData.genre}
            onChange={(e) =>
              setFormData({ ...formData, genre: e.target.value })
            }
            className="text-black p-1 pl-3 rounded-md cursor-pointer focus:ring-2 focus:ring-neon"
          >
            {genreOptions.map((genreOption) => (
              <option key={genreOption.value} value={genreOption.value}>
                {genreOption.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-neon">Release Date</label>
          <input
            type="date"
            className="w-full p-1 pl-3 rounded-md text-black"
            value={formData.releaseDate}
            onChange={(e) =>
              setFormData({ ...formData, release_date: e.target.value })
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-neon font-semibold">Cast</label>
          {cast.map((member, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 mb-4 border-b pb-2"
            >
              <input
                type="text"
                name="name"
                placeholder="Actor Name"
                value={member.name}
                onChange={(e) => handleCastChange(index, e)}
                className="p-1 pl-3 w-full rounded-md text-black focus:ring-2 focus:ring-neon"
              />

              <input
                type="text"
                name="character"
                placeholder="Character Name"
                value={member.character}
                onChange={(e) => handleCastChange(index, e)}
                className="p-1 pl-3 w-full rounded-md text-black focus:ring-2 focus:ring-neon"
              />

              <div className="flex items-center justify-center text-neon">
                <p>Image: </p>
                <input
                  type="file"
                  name="image"
                  onChange={(e) => handleCastChange(index, e)}
                  className="p-1 pl-3 w-full rounded-md text-black"
                />
              </div>

              {cast.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeCastMember(index)}
                  className="text-red-500 text-sm self-end transition duration-150 ease-in-out cursor-pointer hover:scale-105"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addCastMember}
            className="bg-neon text-black py-2 px-4 font-bold rounded-md transition duration-150 ease-in-out hover:scale-105"
          >
            Add Cast Member
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="input" className="text-neon">
            Description
          </label>
          <textarea
            rows={4}
            cols={4}
            placeholder="Enter the description..."
            className="w-full p-1 pl-3 rounded-md text-black focus:ring-2 focus:ring-neon"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="input" className="text-neon">
            Duration
          </label>
          <TimeInput time={time} setTime={setTime} />
        </div>

        {mode === "add" ? (
          <div className="flex items-center justify-around pt-10">
            <button
              type="submit"
              className="bg-neon text-black py-2 px-5 font-bold rounded-md transition duration-150 ease-in-out hover:scale-110"
            >
              ADD MOVIE
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

export default MoviesSidebar;
