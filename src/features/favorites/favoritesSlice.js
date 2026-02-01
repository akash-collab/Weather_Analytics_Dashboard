import { createSlice } from "@reduxjs/toolkit";
import { loadState, saveState } from "../../utils/localStorage";

const initialState = {
  cities: loadState("favorites", []),
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite(state, action) {
      if (!state.cities.includes(action.payload)) {
        state.cities.push(action.payload);
        saveState("favorites", state.cities);
      }
    },
    removeFavorite(state, action) {
      state.cities = state.cities.filter(
        city => city !== action.payload
      );
      saveState("favorites", state.cities);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;