import {call, put, takeEvery} from 'redux-saga/effects';
import {getCurrentWeather, getWeatherForDate} from '../services/weatherService';
import {getWeatherSuccess} from './weatherSlice';

function* weatherSaga() {
  yield takeEvery('weathers/getWeatherFetch', workGetWeatherFetch);
}
function* workGetWeatherFetch() {
  const weathers = yield call(() => getCurrentWeather());
  yield put(getWeatherSuccess(weathers));
}

export default weatherSaga;
