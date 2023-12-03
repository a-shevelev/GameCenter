import React from "react";
import { useNavigate } from "react-router-dom";

//import { LazyLoadImage } from "react-lazy-load-image-component";
//import "react-lazy-load-image-component/src/effects/blur.css";

const Game = (props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${props.item.url}`);
  };
  return (
    <>
      <div
        onClick={handleClick}
        className="relative w-[500px] md:w-[500px] h-[auto] md:h-[auto] rounded group"
      >
        <div className="absolute group-hover:opacity-0 w-[500px] md:w-[500px] h-[350px] md:h-[350px] bg-gradient-to-t from-black from-1% ... rounded ">
          <div className="absolute bottom-0 w-full flex justify-between items-end p-3 z-20">
            <h1 className="card_text text-white text-xl font-semibold  break-normal break-words font-f">
              {props.item?.name}
            </h1>
          </div>
        </div>

        <img
          className="img w-[500px] md:w-[500px] h-[350px] md:h-[350px]   object-cover rounded"
          src={props.item?.coverImage}
          alt=""
        />
      </div>
    </>
  );
};

export default Game;
