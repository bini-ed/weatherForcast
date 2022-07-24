import axios from 'axios';

const API = '42500b63fa60a10044b4422c04167a69';

export const getCurrentWeather = () => {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=1.2921&lon=-36.8219&appid=${API}&units=metric`,
  );
};
export const getWeatherForTheWeek = () => {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/onecall?lat=1.2921&lon=-36.8219&exclude=minutely,hourly,current&alerts&appid=${API}&units=metric`,
  );
};
export const getWeatherForDate = () => {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/onecall?lat=1.2921&lon=-36.8219&exclude=current,hourly,minutely&appid=${API}&units=metric`,
  );
};
