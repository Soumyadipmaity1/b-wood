import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaFilm } from 'react-icons/fa';
import { getCast } from "../../actions/movie";

const Card = ({ name, character }) => {
  return (
    <div className="relative border-2 mx-5 w-60 cursor-pointer text-center border-white rounded-xl shadow-lg flex flex-col justify-center p-2 transition-transform duration-300 ease-in-out hover:bg-opacity-80">
      <div className="relative h-auto gap-16 w-full pt-6 flex flex-col items-center justify-between rounded-md mb-4 overflow-hidden">
        <FaFilm className="size-28 text-neon" />
        <div className="flex flex-col items-center justify-start">
          <p className="font-extrabold tracking-wider text-lg mb-2">{name}</p>
          <p className="font-normal text-sm mb-2">{character}</p>
        </div>
      </div>
    </div>
  );
};
const CastTable = ({id}) => {
  const [cast, setcast] = useState([{name:'',character:''}])
  useEffect(()=>{
    const fetchCast=async()=>{
      const res=await getCast(id)
      setcast(res.cast)
    }
    fetchCast();
  },[])
  return (
    <div className="mb-20 p-2 lg:px-10">
      <div className="px-10 mt-10">
        <h1 className="text-3xl font-bold text-center text-white pb-7">Cast List</h1>
      </div>

      <MarqueeWrapper>
        <Marquee>
          <MarqueeGroup>
            {cast.concat(cast).map((cast, index) => (
              <Card
                key={index}
                name={cast.name}
                role={cast.character}
              />
            ))}
          </MarqueeGroup>
          {/* <MarqueeGroup>
            {cast.concat(cast).map((cast, index) => (
              <Card
                key={index}
                name={cast.name}
                role={cast.character}
              />
            ))}
          </MarqueeGroup> */}
        </Marquee>
      </MarqueeWrapper>
    </div>
  );
};

export default CastTable;

const MarqueeWrapper = styled.div`
  overflow: hidden;
  width: 100%;
`;

const Marquee = styled.div`
  display: flex;
  overflow: hidden;
  position: relative;
  width: 100%;
`;

const scrollX = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

const MarqueeGroup = styled.div`
  flex-shrink: 0;
  display: flex;
  // animation: ${scrollX} 140s linear infinite;
  will-change: transform;
  min-width: 100%;
`;