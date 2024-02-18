import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit'
import userSlice from './slices/userSlice';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import eventSlice from './slices/eventSlice';
import addEventSlice from './slices/addEventSlice';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getUserSlice from './slices/getUserSlice';


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user'], // Specify which reducers you want to persist
};

const rootReducer = combineReducers({
  user: userSlice,
  event: eventSlice,
  addEvent: addEventSlice,
  getUser: getUserSlice
  // Add other reducers here if you have any
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
})

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;