import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import dataReducer from './dataSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  data: dataReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
