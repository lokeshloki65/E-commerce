import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light", // Default theme
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload; // Set the current theme
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
