import { buildUrl } from "../../utils/apiConfig";

export const fetchCurrentWeather = async (lat, lon, unit) => {
  const url = buildUrl("weather", {
    lat,
    lon,
    units: unit,
  });

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch current weather");

  return res.json();
};

export const fetchForecast = async (lat, lon, unit) => {
  const url = buildUrl("forecast", {
    lat,
    lon,
    units: unit,
  });

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch forecast");

  return res.json();
};