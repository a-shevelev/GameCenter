import React, { useEffect } from "react";
import MainNav from "./navbar/navbar.jsx";

import { useState } from "react";

import Game from "./card.jsx";
function Indesign() {
  const gamesData = [
    {
      id: 1,
      name: "Candy Crush",
      coverImage: "../assets/candy_crush.jpg",
      url: "/",
    },
    {
      id: 2,
      name: "Tetris",
      coverImage: "../assets/tetris.jpg",
      url: "/",
    },
    {
      id: 3,
      name: "Monopoly",
      coverImage: "../assets/monopoly.jpg",
      url: "/",
    },
    {
      id: 4,
      name: "Akinator",
      coverImage: "../assets/akinator.jpg",
      url: "/",
    },

    // Add more game objects as needed
  ];

  return (
    <>
      <MainNav />
      <div className="absolute mt-[100px] w-[100%]">
        <div
          className="grid grid-cols-1 gap-y-10 xs:gap-y-10 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 
        2xl:gap-x-20 justify-items-center"
        >
          {gamesData.map((item) => (
            <>
              <Game item={item} />
            </>
          ))}
        </div>
      </div>
    </>
  );
}

export default Indesign;
