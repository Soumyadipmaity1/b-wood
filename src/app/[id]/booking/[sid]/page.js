"use client";
import React, { useEffect, useState } from "react";
import SeatSelection from "../../../../components/Ticket/SeatSelection";
import { getShowTimeById } from "../../../../actions/theater";
import { order } from "../../../../actions/razorpay.js";
import RenderRazorpay from "../../../../components/Ticket/RenderRazorpay.js";

function Ticket({ params }) {
  const { sid } = params;
  const [showtime, setShowtime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [orderDetails, setOrderDetails] = useState({
    orderId: null,
    currency: null,
    amount: null,
  });
  const [displayRazorpay, setDisplayRazorpay] = useState(false);
  const [seatPrice, setSeatPrice] = useState(200); // Default seat price

  useEffect(() => {
    const fetchShowtime = async () => {
      try {
        const res = await getShowTimeById(sid);
        setShowtime(res);
        if (res.price) {
          setSeatPrice(res.price);
        }
      } catch (error) {
        console.error("Failed to fetch showtime:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShowtime();
  }, [sid]);

  const handleSeatClick = (seat) => {
    // Handle seat selection logic here
    if (showtime && showtime.reserved_seats.includes(seat)) return;

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleSubmit = async (amount) => {
    try {
      const res = await order(amount);
      if (res && res.id) {
        setOrderDetails({
          orderId: res.id,
          amount: res.amount,
        });
      }
      setDisplayRazorpay(true);
    } catch (error) {
      console.log(error);
    }
  };

  const totalAmount = selectedSeats.length * seatPrice;

  if (loading) {
    return <div>Loading...</div>; // Handle loading state here
  }

  return (
    <div className="mt-20 lg:px-20 sm:px-10">
      <div className="hidden lg:flex items-center justify-between sm:px-10 px-4 lg:pt-8 pt-4 pb-5">
        <SeatSelection showtime={showtime} handleSeatClick={handleSeatClick} />
        <div className="flex items-center justify-center flex-col w-full lg:w-3/4 ml-20">
          <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="sm:text-4xl text-3xl text-white font-bold pb-4 text-center">
              {showtime.movieId ? showtime.movieId.title : "Loading"}
            </h1>
            <p className="text-center">
              {showtime.movieId ? showtime.movieId.description : "Loading"}
            </p>
          </div>
          <p className="text-[#a8ff35] flex items-center justify-between w-full px-10 mt-6 mb-10 font-bold tracking-wide bg-[#131313] p-2 rounded-lg">
            {showtime.theaterId ? showtime.theaterId.name : "Loading"}
            <span className="ml-4 text-yellow-400">
              {showtime.movieId ? showtime.movieId.duration : "Loading"}
            </span>
          </p>
          <div className="flex justify-center mt-6">
            <button
              className="bg-[#00ff00] hover:bg-lime-600 cursor-pointer text-black font-bold py-2 xl:h-14 lg:h-16 h-14 xl:px-20 lg:px-10 px-20 rounded-lg"
              disabled={totalAmount === 0}
              onClick={() => handleSubmit(totalAmount)}
            >
              {totalAmount > 0 ? `Pay ${totalAmount} INR` : "Book Ticket"}
            </button>
          </div>
        </div>
      </div>

      <div className="lg:hidden sm:px-10 px-4 lg:pt-8 pt-4 pb-5 bg-[#131313]">
        <div className="w-full flex flex-col items-center">
          <h1 className="sm:text-4xl text-3xl text-white font-bold pb-4 text-center">
            {showtime.movieId ? showtime.movieId.title : "Loading"}
          </h1>
          <p className="text-center">
            {showtime.movieId ? showtime.movieId.description : "Loading"}
          </p>
        </div>
        <p className="text-[#a8ff35] mt-6 w-full flex items-center justify-between">
          {showtime.theaterId ? showtime.theaterId.name : "Loading"}
          <span className="ml-4 text-yellow-400">
            {showtime.movieId ? showtime.movieId.duration : "Loading"}
          </span>
        </p>
      </div>

      <div className="lg:hidden">
        <hr className="pb-10 border-gray-400 lg:hidden w-full mx-auto" />
        <SeatSelection showtime={showtime} handleSeatClick={handleSeatClick} />
      </div>

      {displayRazorpay && (
        <RenderRazorpay
          amount={orderDetails.amount}
          orderId={orderDetails.orderId}
          keyId={"rzp_test_hAi2jfp9hhWAbU"}
          keySecret={"q59gkQSAD7qKyu8Lis1YecuM"}
          showtime={showtime}
          selectedSeats={selectedSeats}
        />
      )}
    </div>
  );
}

export default Ticket;