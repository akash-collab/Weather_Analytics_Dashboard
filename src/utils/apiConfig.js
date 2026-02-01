const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const buildUrl = (endpoint, params = {}) => {
  const url = new URL(`${BASE_URL}/${endpoint}`);
  url.searchParams.append("appid", API_KEY);

  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value)
  );

  return url.toString();
};