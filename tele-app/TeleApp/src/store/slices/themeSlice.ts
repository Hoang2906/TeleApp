import { createSlice } from "@reduxjs/toolkit";

type ThemeType = "dark" | "light"

const initState: ThemeType = "light";

const themeSlice = createSlice({
  name: "theme",
  initialState: initState as ThemeType,
  reducers: {
    toggle: (state) => {
      if (state === "light") {
        return "dark";
      }
      return "light";
    }
  }
});

export const { toggle } = themeSlice.actions;
export default themeSlice.reducer;
