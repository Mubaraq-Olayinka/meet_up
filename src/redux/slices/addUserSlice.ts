// eventsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store'; // Define AppThunk type in your store file
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';

interface User {
    email: string,
    firstName: string,
    lastName: string,
    // password: string,
    location: string,
}

interface UserState {
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  loading: false,
  error: null,
};

const addUserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    postUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    postUserSuccess(state) {
      state.loading = false;
    },
    postUserFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { postUserStart, postUserSuccess, postUserFailure } = addUserSlice.actions;

export const postUser = (user: User): AppThunk => async dispatch => {
  dispatch(postUserStart());
  try {
    await firestore().collection('Users').add(user);
    dispatch(postUserSuccess());
  } catch (error) {
    const errorMessage = typeof error === 'string' ? error : 'An unknown error occurred';
    dispatch(postUserFailure(errorMessage));
    Snackbar.show({
        text: errorMessage,
        backgroundColor: "#A9A9A9",
        textColor: "#343434",
      });
  }
};

export default addUserSlice.reducer;
