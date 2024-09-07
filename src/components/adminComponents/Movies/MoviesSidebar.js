"use client";
import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import TimeInput from "./TimeInput";
import { deleteMoviebyId, getCastById, getMoviebyId, newMovie, updateMoviebyId } from "../../../actions/movie";

const MoviesSidebar = ({ isOpen, onClose, mode , movieId}) => {
  const [formData, setFormData] = useState({
    title: "",
    poster: null,
    language: "",
    genre: "",
    release_date: "",
    description: "",
  },[]);
  const [time, setTime] = useState({ hours: '', minutes: '', seconds: '' });
  const [cast, setCast] = useState([{ name: "", character: "", image: null }]);
  const formatDate = (date) => {
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };
  useEffect(() => {
    const fetchData = async () => {
      let castIds = [];
      if (movieId && mode==='edit') {
        try {
          const res = await getMoviebyId(movieId);
          console.log(res);
          setFormData({
            title: res.title,
            poster: res.images,
            language: res.languages,
            genre: res.genre,
            release_date: formatDate(new Date(res.release_date)),
            description: res.description,
          });
  
          const regex = /(?:(\d+)h)?(?:\s*(\d+)m)?(?:\s*(\d+)s)?/;
          const match = res.duration.match(regex);
          setTime({
            hours: match[1] || '0',
            minutes: match[2] || '0',
            seconds: match[3] || '0',
          });
  
          castIds = res.cast || []; // Extract cast IDs
        } catch (error) {
          console.error("Error fetching movie data:", error);
        }
      }
  
      // Fetch cast details
      if (castIds.length > 0) {
        try {
          const totalCast = await Promise.all(castIds.map(async (castId) => {
            const gotCast = await getCastById(castId);
            return gotCast;
          }));
          // console.log(totalCast);
          setCast(totalCast); // Update the cast state
        } catch (error) {
          console.error("Error fetching cast data:", error);
        }
      } else {
        setCast([]); // If no cast IDs, clear the cast state
      }
    };
    if(mode==='add'){
      setFormData({title: "",
        poster: null,
        language: "",
        genre: "",
        release_date: "",
        description: ""
      });
      setTime({ hours: '', minutes: '', seconds: '' });
    }
    fetchData();
  }, [mode, movieId]);
  

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

  const handleCastChange = async (index, event) => {
    const { name, value, files } = event.target;
    const updatedCast = [...cast];
    if (files && files[0]) { // Check if files is not null or undefined and files[0] exists
      const file = files[0];
      const base64 = await fileToBase64(file);
      updatedCast[index][name] = base64;
    } else {
      updatedCast[index][name] = value;
    }
    setCast(updatedCast);
  };
  
  const fileToBase64 = (file) => {
    if (!(file instanceof Blob)) { // Check if file is a Blob type
      throw new Error("File is not a Blob type");
    }
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
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
    if(mode==='add'){
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
    }else{
      console.log("other edit")

    }
  };

  const updateMovie=async()=>{
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
      const movie=await updateMoviebyId(movieId,data,cast);
      console.log("Movie updated:", movie);
    } catch (error) {
      console.error("Error creating movie:", error.message);
    }
    try {
    } catch (error) {
      console.log("Error")
    }
  }
  const deleteMovie=async()=>{
    try {
      const res=await deleteMoviebyId(movieId)
      console.log(res)
    } catch (error) {
      console.log("Error")
    }
  }
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
            value={formData.release_date}
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
              onClick={updateMovie}
            >
              UPDATE
            </button>
            <button
              type="button"
              className="bg-black border-2 border-neon text-neon py-2 px-5 font-bold rounded-md transition duration-150 ease-in-out hover:scale-110"
              onClick={deleteMovie}
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