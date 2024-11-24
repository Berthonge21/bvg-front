import { configureStore } from '@reduxjs/toolkit';
import { persistedReducer } from './rootReducer';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from '_store/src/saga/saga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
