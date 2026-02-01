import { createSlice } from "@reduxjs/toolkit";
import { loadState, saveState } from "../../utils/localStorage";

const initialState = {
  unit: loadState("unit", "metric"),
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleUnit(state) {
      state.unit = state.unit === "metric" ? "imperial" : "metric";
      saveState("unit", state.unit);
    },
  },
});

export const { toggleUnit } = settingsSlice.actions;
export default settingsSlice.reducer;