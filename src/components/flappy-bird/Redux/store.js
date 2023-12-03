import { configureStore } from "@reduxjs/toolkit";
import birdReducer from "./birdReducer.js";
import gameReducer from "./gameReducer.js";
import pipeReducer from "./pipeReducer.js";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    bird: birdReducer,
    pipe: pipeReducer,
  },
});
