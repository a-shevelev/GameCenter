import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bird: {
    y: 310,
    rotation: 0,
  },
};

export const birdSlice = createSlice({
  name: "bird",
  initialState,
  reducers: {
    fly: (state, action) => {
      state.bird.y -= 40;
      state.bird.rotation = -40;
    },
    fall: (state, action) => {
      state.bird.y += 10;
      state.bird.rotation = 0;
    },
    birdReset: (state, action) => {
      state.bird.y = 310;
      state.bird.rotation = 0;
    },
  },
});

export const { fly, fall, birdReset } = birdSlice.actions;

export default birdSlice.reducer;
