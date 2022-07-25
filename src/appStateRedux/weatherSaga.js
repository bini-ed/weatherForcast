import {call, put, takeEvery} from 'redux-saga/effects';
import {getCurrentWeather, getWeatherForDate} from '../services/weatherService';
import {getWeatherForDateSuccess, getWeatherSuccess} from './weatherSlice';

function* weatherSaga() {
  yield takeEvery('weathers/getWeatherFetch', workGetWeatherFetch);
  // yield takeEvery('weathers/getWeatherForTheDateFetch', getWeatherForDateFetch);
}
function* workGetWeatherFetch() {
  const weathers = yield call(() => getCurrentWeather());
  yield put(getWeatherSuccess(weathers.data));
}

function* getWeatherForDateFetch() {
  const weathers = yield call(() => getWeatherForDate());
  yield put(getWeatherForDateSuccess(weathers.data));
}

export default weatherSaga;
