// authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppThunk } from "../store";
import auth from "@react-native-firebase/auth";
import Snackbar from "react-native-snackbar";
import firestore from '@react-native-firebase/firestore';

interface User {
  email: string;
  // Add other user properties as needed
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setUser, setLoading, setError } = userSlice.actions;

export const login =
  (email: string, password: string): AppThunk =>
  async (dispatch) => {
    try {
      console.log('starting')
      dispatch(setLoading(true));
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password
      );
      console.log('action')
      const user = userCredential.user;
      if (user && user.email) {
        dispatch(setUser({ email: user.email })); 
      }
      const userDataDoc = await firestore().collection('Users').doc(user.uid).get();
      const userData = userDataDoc.exists ? userDataDoc.data() : null;
      console.log(userData)
      await AsyncStorage.setItem("user", JSON.stringify({ ...user, userData }));
      console.log(await AsyncStorage.getItem('user'))
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error, 'error')
      const errorMessage =
        typeof error === "string" ? error : "An unknown error occurred";
      dispatch(setError(errorMessage));
      dispatch(setLoading(false));
      Snackbar.show({
        text: errorMessage,
        backgroundColor: "#A9A9A9",
        textColor: "#343434",
      });
    }
  };

export const logout = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await auth().signOut();
    await AsyncStorage.removeItem("user");
    dispatch(setUser(null));
    dispatch(setLoading(false));
  } catch (error) {
    const errorMessage =
      typeof error === "string" ? error : "An unknown error occurred";
    dispatch(setError(errorMessage));
    dispatch(setLoading(false));
    Snackbar.show({
      text: errorMessage,
      backgroundColor: "#A9A9A9",
      textColor: "#343434",
    });
  }
};

export const initializeUser = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const user = await AsyncStorage.getItem("user");
    if (user) {
      dispatch(setUser(JSON.parse(user)));
    }
    dispatch(setLoading(false));
  } catch (error) {
    const errorMessage =
      typeof error === "string" ? error : "An unknown error occurred";
    dispatch(setError(errorMessage));
    dispatch(setLoading(false));
    Snackbar.show({
      text: errorMessage,
      backgroundColor: "#A9A9A9",
      textColor: "#343434",
    });
  }
};

export const signUp =
  (email: string, password: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;
      if (user && user.email) {
        dispatch(setUser({ email: user.email })); 
      }
      await AsyncStorage.setItem("user", JSON.stringify({ email: user.email }));
      dispatch(setLoading(false));
    } catch (error) {
      const errorMessage =
        typeof error === "string" ? error : "An unknown error occurred";
      dispatch(setError(errorMessage));
      dispatch(setLoading(false));
    }
  };

export default userSlice.reducer;
