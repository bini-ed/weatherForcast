import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import weatherSaga from './weatherSaga';

import weatherReducer from './weatherSlice';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    weathers: weatherReducer,
  },
  middleware: [sagaMiddleware],
});
sagaMiddleware.run(weatherSaga);
