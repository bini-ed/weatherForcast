import {createSlice} from '@reduxjs/toolkit';

export const weatherSlice = createSlice({
  name: 'weathers',
  initialState: {
    weathers: [],
    selectedDayWeather: 0,
    loading: false,
  },
  reducers: {
    getWeatherFetch: state => {
      state.loading = true;
    },
    getWeatherSuccess: (state, actions) => {
      state.weathers = actions.payload;
      state.loading = false;
    },
    getWeatherError: state => {
      state.loading = false;
      console.log('err');
    },
    getWeatherForDateFetch: state => {
      state.loading = true;
    },
    getWeatherForDateSuccess: (state, actions) => {
      state.weathers = actions.payload;
      state.loading = false;
    },
    getWeatherForDateError: state => {
      state.loading = false;
      console.log('err in redux');
    },
  },
});

export const {
  getWeatherFetch,
  getWeatherSuccess,
  getWeatherForDateFetch,
  getWeatherForDateSuccess,
} = weatherSlice.actions;

export default weatherSlice.reducer;
