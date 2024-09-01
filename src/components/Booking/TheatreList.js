"use client";
import React, { useEffect, useState } from "react";
import { getShowtimeByTheaterAndMovieId, getTheaterByMovieId } from "../../actions/theater.js";
import Link from "next/link";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TheatreListSkeleton = () => (
  <div className="bg-black p-6 w-full lg:w-2/3 text-neon border-[1px] border-white rounded-md">
    <h2 className="text-white text-lg flex items-center pb-4 font-bold tracking-wide">
      <Skeleton width={200} height={20} />
    </h2>
    <hr className="w-full mb-8 border-0 h-[2px] bg-white" />
    <div className="h-72 overflow-y-auto">
      {Array(3)
        .fill()
        .map((_, index) => (
          <div key={index} className="mb-4 border-2 p-4 rounded-md">
            <div className="text-white mb-2">
              <Skeleton width={150} height={20} />
            </div>
            <div className="flex justify-start">
              {Array(3)
                .fill()
                .map((_, idx) => (
                  <Skeleton
                    key={idx}
                    width={80}
                    height={30}
                    className="mr-2 rounded-md"
                  />
                ))}
            </div>
          </div>
        ))}
    </div>
  </div>
);

const TheatreList = ({ location, id }) => {
  const [theaters, setTheaters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTheater = async () => {
      try {
        const res = await getTheaterByMovieId(id);
        const updatedTheaters = await Promise.all(
          res.map(async (theater) => {
            const theaterId = theater._id;
            const showtimes = await getShowtimeByTheaterAndMovieId(theaterId, id);
            return {
              name: theater.name,
              showtimes,
            };
          })
        );
        setTheaters(updatedTheaters);
      } catch (error) {
        console.error("Error fetching theaters or showtimes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTheater();
  }, [id]);

  if (loading) {
    return <TheatreListSkeleton />;
  }

  return (
    <div className="bg-black p-6 w-full lg:w-2/3 text-neon border-[1px] border-white rounded-md">
      <h2 className="text-white text-lg flex items-center pb-4 font-bold tracking-wide">
        Theatres in {location}
      </h2>
      <hr className="w-full mb-8 border-0 h-[2px] bg-white" />
      <div className="h-72 overflow-y-auto">
        {theaters.map((theatre, index) => (
          <div key={index} className="mb-4 border-2 p-4 rounded-md">
            <div className="text-white mb-2">{theatre.name}</div>
            <div className="flex justify-start">
              {theatre.showtimes.map((time, idx) => (
                <Link key={idx} href={`/${id}/booking/${time._id}`} passHref>
                  <button className="bg-gray-800 text-neon px-4 py-2 rounded-md hover:bg-black border-2 border-neon font-bold transition-all duration-200 ease-in-out mr-2">
                    {time.startAt}
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
