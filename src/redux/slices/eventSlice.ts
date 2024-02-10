// slices/firestoreSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import { AppDispatch } from '../store';
import Snackbar from 'react-native-snackbar';

interface Event {
  id: string;
  date: string;
  location: string;
  time: string;
  title: string
}

interface FirestoreState {
  events: Event[];
  loading: boolean;
  error: string | null;
}

const initialState: FirestoreState = {
  events: [],
  loading: false,
  error: null,
};

const firestoreSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    fetchEventsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchEventsSuccess: (state, action: PayloadAction<Event[]>) => {
      state.loading = false;
      state.events = action.payload;
    },
    fetchEventsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchEventsRequest, fetchEventsSuccess, fetchEventsFailure } = firestoreSlice.actions;

export const fetchEvents = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchEventsRequest());

    const usersSnapshot = await firestore().collection('Event').get();
    const usersData = usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Event));

    dispatch(fetchEventsSuccess(usersData));
  } catch (error) {
    const errorMessage = typeof error === 'string' ? error : 'An unknown error occurred';
    dispatch(fetchEventsFailure(errorMessage));
    Snackbar.show({
        text: errorMessage,
        backgroundColor: "#A9A9A9",
        textColor: "#343434",
      });
  }
};

export default firestoreSlice.reducer;
