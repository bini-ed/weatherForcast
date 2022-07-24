import {createSlice} from '@reduxjs/toolkit';

export const weatherSlice = createSlice({
  name: 'weathers',
  initialState: {
    weathers: [],
    loading: false,
  },
  reducers: {
    getWeatherFetch: state => {
      state.loading = true;
    },
    getWeatherSuccess: (state, actions) => {
      state.weathers = actions.payload.data;
      state.loading = false;
    },
    getWeatherError: state => {
      state.loading = false;
      console.log('err');
    },
  },
});

export const {getWeatherFetch, getWeatherSuccess} = weatherSlice.actions;

export default weatherSlice.reducer;
