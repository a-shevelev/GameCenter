import React, { useEffect, useRef, useState } from "react";
import Bird from "./Bird";
import ForeGround from "./ForeGround";
import Pipe from "./Pipe";
import { useDispatch, useSelector } from "react-redux";
import { addScore, gameOver, start } from "../Redux/gameReducer";
import { fly, fall, birdReset } from "../Redux/birdReducer";
import { generatePipe, pipeReset, pipeRun } from "../Redux/pipeReducer";

let gameLoop;
let pipeGenerator;
let fallLoop;

export default function Game() {
  const dispatch = useDispatch();
  const { game } = useSelector((state) => state.game);

  const { bird } = useSelector((state) => state.bird);
  const { pipes, startPosition } = useSelector((state) => state.pipe);
  const wingRef = useRef(null);
  const hitRef = useRef(null);
  const pointRef = useRef(null);

  function startGameLoop() {
    gameLoop = setInterval(() => {
      dispatch(pipeRun());
    }, 50);
    fallLoop = setInterval(() => {
      dispatch(fall());
    }, 100);

    for (let i = 0; i < 3; i++) {
      dispatch(generatePipe());
      //dispatch(addScore());
    }

    pipeGenerator = setInterval(() => {
      dispatch(generatePipe());
      dispatch(addScore());

      pointRef.current.play();
    }, 3000);
  }

  function stopGameLoop() {
    clearInterval(gameLoop);
    clearInterval(pipeGenerator);
    clearInterval(fallLoop);
  }

  const handleClick = (e) => {
    if (game.status === "PLAYING") {
      dispatch(fly());
      wingRef.current.play();
    }
  };

  const newGameHandler = () => {
    stopGameLoop();
    dispatch(gameOver());
    dispatch(birdReset());
    dispatch(pipeReset());
    startGameLoop();
    dispatch(start());
  };

  useEffect(() => {
    if (game.status === "GAME_OVER") {
      console.log(game.status);
      stopGameLoop();
    } else {
      const x = startPosition.x;
      //console.log(bird.y);
      //console.log(x);

      const challenge = pipes
        .map(({ height }, i) => {
          return {
            x1: x + i * 300,
            y1: height,
            x2: x + i * 300,
            y2: height + 150,
          };
        })
        .filter(({ x1 }) => {
          if (x1 > 0 && x1 < 288) {
            return true;
          }
        });

      if (bird.y > 700) {
        dispatch(gameOver());
        dispatch(birdReset());
        dispatch(pipeReset());
        hitRef.current.play();
      }

      if (challenge.length) {
        const { x1, y1, x2, y2 } = challenge[0];
        console.log(x1, bird.y, startPosition.x);
        //console.log();

        if (
          (x1 <= 120 && 120 <= x1 + 80 && bird.y <= y1 - 10) ||
          (x2 <= 120 && 120 <= x2 + 80 && bird.y >= y2 - 10)
        ) {
          hitRef.current.play();
          dispatch(gameOver());
          dispatch(birdReset());
          dispatch(pipeReset());
        }
      }
    }
  }, [startPosition.x]);

  return (
    <div className="game-div" onClick={handleClick}>
      <audio ref={hitRef} src="./hit.mp3"></audio>

      {game.status === "NEW_GAME" && (
        <>
          <img
            className="start-btn"
            src="./start-button.png"
            onClick={newGameHandler}
            alt=""
          />
          <Bird />
        </>
      )}
      {game.status === "GAME_OVER" && (
        <>
          <img
            className="start-btn"
            src="./start-button.png"
            onClick={newGameHandler}
            alt=""
            style={{ position: "absolute" }}
          />
          <h2 style={{ position: "absolute", top: 150, left: 0, right: 0 }}>
            Game Over
          </h2>
          <h2 style={{ position: "absolute", top: 200, left: 0, right: 0 }}>
            {game.score}
          </h2>
        </>
      )}
      {game.status === "PLAYING" && (
        <>
          <audio ref={wingRef} src="./wing.mp3"></audio>
          <audio ref={pointRef} src="./point.mp3"></audio>
          <Bird />
          <Pipe />

          <h2 style={{ position: "absolute", top: 100, left: 0, right: 0 }}>
            {game.score}
          </h2>
        </>
      )}
      <ForeGround />
    </div>
  );
}
