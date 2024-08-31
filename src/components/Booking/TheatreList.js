"use client";
import React, { useEffect, useState } from "react";
import { getShowtimeByTheaterAndMovieId, getTheaterByMovieId } from "../../actions/theater.js";
import Link from "next/link";

const TheatreList = ({ location, id }) => {
  const [theaters, setTheaters] = useState([
    { name: "", showtimes: [{ startAt: "" }] },
  ]);
  useEffect(() => {
    const fetchTheater = async () => {
      // console.log(id);
      const res = await getTheaterByMovieId(id);
      console.log(res);
      //map through the res and extract the _id as theaterId from all the item of res
      //use that theaterId to get the showtimes using that theaterId and id;
      //populate the showtimes with that showtimes and the that theater.
      const updatedTheaters = await Promise.all(
        res.map(async (theater) => {
          const theaterId = theater._id;
          const showtimes = await getShowtimeByTheaterAndMovieId(theaterId, id);
          return {
            name: theater.name, // Only keep the name
            showtimes, // Populate with fetched showtimes
          };
        })
      );
      console.log(updatedTheaters)
      setTheaters(updatedTheaters);
    };
    fetchTheater();
  }, []);

  const handleClick=(id)=>{
    console.log(id)
  }

  return (
    <div className="bg-black p-6 w-full lg:w-2/3 text-neon border-[1px] border-white rounded-md">
      <h2 className="text-white text-lg flex items-center pb-4 font-bold tracking-wide">
        Theatres in { location }
      </h2>
      <hr className="w-full mb-8 border-0 h-[2px] bg-white" />
      <div className="h-72 overflow-y-auto">
        {theaters.map((theatre, index) => (
          <div key={index} className="mb-4 border-2 p-4 rounded-md">
            <div className="text-white mb-2">{theatre.name}</div>
            <div className="flex justify-start">
              {theatre.showtimes.map((time, idx) => (
              <Link
              key={idx}
              href={`/${id}/booking/${time._id}`} // Dynamic URL
              passHref
            >
              <button
                className="bg-gray-800 text-neon px-4 py-2 rounded-md hover:bg-black border-2 border-neon font-bold transition-all duration-200 ease-in-out mr-2"
              >
                {time.startAt} {/* Render the showtime start time */}
              </button>
            </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TheatreList;