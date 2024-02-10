// eventsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store'; // Define AppThunk type in your store file
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';

interface Event {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string
}

interface EventsState {
  loading: boolean;
  error: string | null;
}

const initialState: EventsState = {
  loading: false,
  error: null,
};

const addEventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    postEventStart(state) {
      state.loading = true;
      state.error = null;
    },
    postEventSuccess(state) {
      state.loading = false;
    },
    postEventFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { postEventStart, postEventSuccess, postEventFailure } = addEventSlice.actions;

export const postEvent = (event: Event): AppThunk => async dispatch => {
  dispatch(postEventStart());
  try {
    await firestore().collection('Event').add(event);
    dispatch(postEventSuccess());
  } catch (error) {
    const errorMessage = typeof error === 'string' ? error : 'An unknown error occurred';
    dispatch(postEventFailure(errorMessage));
    Snackbar.show({
        text: errorMessage,
        backgroundColor: "#A9A9A9",
        textColor: "#343434",
      });
  }
};

export default addEventSlice.reducer;
