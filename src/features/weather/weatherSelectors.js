export const selectWeatherByCity = (city) => (state) =>
  state.weather.data[city];

export const selectWeatherStatus = (state) =>
  state.weather.status;