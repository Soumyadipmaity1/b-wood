"use client";
import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import {createShowtime, createTheater, deleteTheaterBy, getShowtimeBytheaterId, getTheaterById, updateShowtime, updateTheaterById}from '../../../actions/theater.js'
import { getAllMovieIds } from "../../../actions/movie.js";

const TheatresSidebar = ({ isOpen, onClose, mode,theaterId }) => {
  const [theatre, setTheatre] = useState({
    name: "",
    city: "",
    image: null,
    movieIds: [],
  });
  const [showtimes, setShowtimes] = useState([
    { startAt: "", endAt: "", price: 0, movieId: "" ,theatreId:"",isNew:true},
  ]);
  const [moviesList, setMoviesList] = useState([]);
  const [existingMovieIds, setExistingMovieIds] = useState([]); // To store existing movie IDs

  let movieId=[]
  useEffect(() => {
    const fetchMovies = async () => {
      const movies = await getAllMovieIds();
      setMoviesList(movies);
      console.log("Movies fetched:", movies);
      // console.log("this is mode and ",mode,theatreId);
    };
    const fetchData = async () => {
      if(theaterId){
        const res=await getTheaterById(theaterId);
        console.log("theater",res)
        if(res){
          setTheatre({
            name:res.name,
            city:res.city,
            image:res.image,
            movieIds:res.movieId
          })
          setExistingMovieIds(res.movieId || []);
        }
        const showres=await getShowtimeBytheaterId(theaterId);
        console.log(showres)
        if(showres){
          setShowtimes(showres.map(show=>({
            ...show,
            isNew:false
          })));
        }
        if(mode==='add'){
          setTheatre({
            name:"",
            city:"",
            image:null,
            movieIds:[]
          })
          setShowtimes(
            { startAt: "", endAt: "", price: 0, movieId: "" ,theatreId:""},
          )
        }
      }
    };
    fetchMovies();
    console.log(mode,theaterId)
    if(theaterId){
      fetchData();
    }
  }, [mode,theaterId]);

  const handleTheatreChange = (event) => {
    const { name, value } = event.target;
    setTheatre((prev) => ({ ...prev, [name]: value }));
  };

  const handleMovieSelect = (event) => {
    const selectedMovieId = event.target.value;
    setTheatre((prev) => {
      let updatedMovieIds = [...prev.movieIds];
      if (!updatedMovieIds.includes(selectedMovieId)) {
        updatedMovieIds.push(selectedMovieId);
      }
      return { ...prev, movieIds: updatedMovieIds };
    });
  };


  const handleShowtimeChange = (index, event) => {
    const { name, value } = event.target;
    const updatedShowtimes = [...showtimes];
    if(name==='price'){
      updatedShowtimes[index][name] = Number(value);
    }else{
      updatedShowtimes[index][name] = value;
    }
    setShowtimes(updatedShowtimes);
  };

  const addShowtime = () => {
    setShowtimes([
      ...showtimes,
      { startAt: "", endAt: "", price: "", movieId: "",isNew:true },
    ]);
  };

  const removeShowtime = (index) => {
    const updatedShowtimes = [...showtimes];
    updatedShowtimes.splice(index, 1);
    setShowtimes(updatedShowtimes);
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

  const handleSubmit=async (e)=>{
    e.preventDefault();
    // console.log(theatre)
    const data=new FormData();
    if(mode==='add'){
      if(theatre.image){
        const baseImage=await fileToBase64(theatre.image);
        data.append('image',baseImage);
      }
      data.append('name',theatre.name)
      data.append('city',theatre.city)
      data.append('movieId',JSON.stringify(theatre.movieIds));
      const newTheater=await createTheater(data);
      console.log(newTheater);
      const{_id}=newTheater
      const showTimes=await createShowtime(showtimes,_id)
      console.log(showTimes)
    }
  }

  const updateTheater=async()=>{
    try {
      const data=new FormData();
      if(theatre.image){
        const baseImage=await fileToBase64(theatre.image);
        data.append('image',baseImage);
      }
      data.append('name',theatre.name)
      data.append('city',theatre.city)
      data.append('movieId',JSON.stringify(theatre.movieIds));
      console.log(theatre.movieIds)
      
      const res=await updateTheaterById(theaterId,data);
      console.log(res)
      const newShowtimes=showtimes.filter(show=>show.isNew);
      const oldShowtimes=showtimes.filter(show=>!show.isNew);
      console.log(newShowtimes)
      console.log(oldShowtimes);
      if(newShowtimes.length>0){
        const res=await createShowtime(newShowtimes,theaterId);
        console.log(res);
      }
      if(oldShowtimes.length>0){
        const res= await updateShowtime(oldShowtimes);
        console.log(res);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteTheater=async()=>{
    try {
      await deleteTheaterBy(theaterId);
    } catch (error) {
      console.log(error)
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
          <label className="text-neon font-semibold">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter the theatre name..."
            value={theatre.name}
            onChange={handleTheatreChange}
            className="p-1 pl-3 w-full rounded-md text-black focus:ring-2 focus:ring-neon"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-neon font-semibold">City</label>
          <input
            type="text"
            name="city"
            placeholder="Enter the city..."
            value={theatre.city}
            onChange={handleTheatreChange}
            className="p-1 pl-3 w-full rounded-md text-black focus:ring-2 focus:ring-neon"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-neon font-semibold">Image</label>
          <input
            type="file"
            name="image"
            // value={theatre.image}
            onChange={(e) =>
              setTheatre({ ...theatre, image: e.target.files[0] })}
            className="p-1 pl-3 w-full rounded-md text-black focus:ring-2 focus:ring-neon"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-neon font-semibold">MoviesId</label>
          <select
            name="moviesId"
            value={theatre.movieIds[0]}
            onChange={handleMovieSelect}
            className="p-1 pl-3 w-full rounded-md text-black focus:ring-2 focus:ring-neon"
          >
            <option value="">Select a Movie</option>
            {moviesList.map((movie) => (
              <option key={movie.id} value={movie.id}>
                  {movie.title} (ID: {movie.id})
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={addShowtime}
          className="bg-neon text-black py-2 px-4 font-bold rounded-md transition duration-150 ease-in-out hover:scale-105"
        >
          Add Showtime
        </button>

        {showtimes.map((showtime, index) => (
          <div key={index} className="flex flex-col gap-2 mb-4 border-b pb-2">
            <label className="text-neon font-semibold">Start At</label>
            <input
              type="time"
              name="startAt"
              placeholder="Start time..."
              value={showtime.startAt}
              onChange={(e) => handleShowtimeChange(index, e)}
              className="p-1 pl-3 w-full rounded-md text-black focus:ring-2 focus:ring-neon"
            />

            <label className="text-neon font-semibold">End At</label>
            <input
              type="date"
              name="endAt"
              placeholder="End time..."
              value={showtime.endAt}
              onChange={(e) => handleShowtimeChange(index, e)}
              className="p-1 pl-3 w-full rounded-md text-black focus:ring-2 focus:ring-neon"
            />

            <label className="text-neon font-semibold">Price</label>
            <input
              type="number"
              name="price"
              placeholder="Price..."
              value={showtime.price}
              onChange={(e) => handleShowtimeChange(index, e)}
              className="p-1 pl-3 w-full rounded-md text-black focus:ring-2 focus:ring-neon"
            />

            <label className="text-neon font-semibold">MoviesId</label>
            <select
              name="movieId"
              value={showtime.movieId}
              onChange={(e) => handleShowtimeChange(index, e)}
              className="p-1 pl-3 w-full rounded-md text-black focus:ring-2 focus:ring-neon"
            >
              <option value="">Select a Movie</option>
              {moviesList.map((movie) => (
                <option key={movie.id} value={movie.id}>
                  {movie.title} (ID: {movie.id})
                </option>
              ))}
            </select>

            {showtimes.length > 1 && (
              <button
                type="button"
                onClick={() => removeShowtime(index)}
                className="text-red-500 text-sm self-end transition duration-150 ease-in-out cursor-pointer hover:scale-105"
              >
                Remove Showtime
              </button>
            )}
          </div>
        ))}

        {mode === "add" ? (
          <div className="flex items-center justify-around pt-10">
            <button
              type="submit"
              className="bg-neon text-black py-2 px-5 font-bold rounded-md transition duration-150 ease-in-out hover:scale-110"
            >
              ADD THEATRE
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-around gap-3 pt-10">
            <button
              type="submit"
              className="bg-neon text-black py-2 px-5 font-bold rounded-md transition duration-150 ease-in-out hover:scale-110"
              onClick={updateTheater}
            >
              UPDATE
            </button>
            <button
              type="submit"
              className="bg-black border-2 border-neon text-neon py-2 px-5 font-bold rounded-md transition duration-150 ease-in-out hover:scale-110"
              onClick={deleteTheater}
            >
              DELETE
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default TheatresSidebar;
