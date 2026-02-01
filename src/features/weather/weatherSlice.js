import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCurrentWeather, fetchForecast } from "./weatherAPI";

const CACHE_DURATION = 60 * 1000;

export const getWeatherByCity = createAsyncThunk(
  "weather/getWeatherByCity",
  async ({ city, unit }, { getState }) => {
    const state = getState();
    const cacheKey = `${city}_${unit}`;
    const cached = state.weather.data[cacheKey];

    if (
      cached &&
      Date.now() - cached.lastFetched < CACHE_DURATION
    ) {
      return {
        key: cacheKey,
        data: cached,
        cached: true,
      };
    }

    const geoRes = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
    );

    const geoData = await geoRes.json();
    if (!geoData.length) throw new Error("City not found");

    const { lat, lon, name } = geoData[0];

    const [current, forecast] = await Promise.all([
      fetchCurrentWeather(lat, lon, unit),
      fetchForecast(lat, lon, unit),
    ]);

    return {
      key: `${name}_${unit}`,
      data: {
        current,
        forecast,
        unit,
        lastFetched: Date.now(),
      },
      cached: false,
    };
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    data: {},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWeatherByCity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getWeatherByCity.fulfilled, (state, action) => {
        const { key, data } = action.payload;
        state.status = "succeeded";
        state.data[key] = data;
      })
      .addCase(getWeatherByCity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
},
});

export default weatherSlice.reducer;