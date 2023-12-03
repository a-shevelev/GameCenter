import React, { useEffect } from "react";
import MainNav from "./navbar/navbar.jsx";

import { useState } from "react";

import Game from "./card.jsx";
function Home() {
  const gamesData = [
    {
      id: 1,
      name: "Connect Four",
      coverImage: "../assets/connect_four.jpg",
      url: "connect-four",

      // Add other game properties
    },
    {
      id: 2,
      name: "Flappy Bird",
      coverImage: "../assets/flappy_bird.jpg",
      url: "flappy-bird",
      // Add other game properties
    },
    {
      id: 3,
      name: "2048",
      coverImage: "../assets/2048.jpg",
      url: "2048",
      // Add other game properties
    },
    {
      id: 4,
      name: "Blackjack",
      coverImage: "../assets/blackjack.jpg",
      url: "blackjack",
      // Add other game properties
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

export default Home;
