import axios from 'axios';

const API = '42500b63fa60a10044b4422c04167a69';

export const getCurrentWeather = () => {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=Dubai&appid=${API}&units=metric`,
  );
};
export const getWeatherForTheWeek = () => {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/onecall?lat=51.5085&lon=-0.1257&exclude=minutely,hourly,current&alerts&appid=${API}&units=metric`,
  );
};
