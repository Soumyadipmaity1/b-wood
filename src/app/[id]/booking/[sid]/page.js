"use client";
import React, { useEffect, useState } from "react";
import SeatSelection from "../../../../components/Ticket/SeatSelection";
import { getShowTimeById } from "../../../../actions/theater";

function Ticket({ params }) {
  const { sid } = params;
  const [showtime, setShowtime] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShowtime = async () => {
      try {
        const res = await getShowTimeById(sid);
        setShowtime(res);
      } catch (error) {
        console.error("Failed to fetch showtime:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShowtime();
  }, [sid]);

  if (loading) {
    return <div>Loading...</div>; // Handle loading state here
  }

  return (
    <div className="mt-28 lg:px-20 sm:px-10">
      <div className="sm:px-10 px-4 lg:pt-8 pt-4 pb-5 bg-[#131313]">
        <h1 className="sm:text-4xl text-3xl text-white font-bold pb-4">
          {showtime.movieId ? showtime.movieId.title : "Loading"}
        </h1>
        <p className="text-[#a8ff35]">
          {showtime.theaterId ? showtime.theaterId.name : "Loading"}
          <span className="ml-4 text-yellow-400">
            {showtime.movieId ? showtime.movieId.duration : "Loading"}
          </span>
        </p>
      </div>
      <hr className="pb-10 border-gray-400" />
      <SeatSelection showtime={showtime}/>
    </div>
  );
}

export default Ticket;
