import React from "react";
import SeatSelection from "../../../../components/Ticket/SeatSelection"
function Ticket() {
  return (
    <div>
      {" "}
      <div className="mt-28 lg:px-20 sm:px-10 ">
        <div className="sm:px-10 px-4 lg:pt-8 pt-4 pb-5 bg-[#131313]">
          <h1 className="sm:text-4xl text-3xl text-white font-bold pb-4 ">
            Deadpool and Wolverine
          </h1>
          <p className="text-[#a8ff35]">
            Theater name{" "}
            <span className="ml-4 text-yellow-400">21 August, 2024 </span>
          </p>
        </div>
        <hr className="pb-10 border-gray-400 " />
        <SeatSelection />
      </div>
    </div>
  );
}

export default Ticket;
