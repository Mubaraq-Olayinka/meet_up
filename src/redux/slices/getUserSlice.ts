// reducers/userSlice.js
import { createSlice } from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const getUserSlice = createSlice({
  name: 'getUser',
  initialState: {
    userData: null,
    loading: false,
    error: null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setUserData, setLoading, setError } = getUserSlice.actions;

  export const fetchUserData = (userId: string | undefined) => {
    return async (dispatch: (arg0: { payload: any; type: "getUser/setUserData" | "getUser/setLoading" | "getUser/setError"; }) => void) => {
      try {
        dispatch(setLoading(true));
        const userDocument = await firestore().collection('Users').doc(userId).get();
        const userData = userDocument.data();
        dispatch(setUserData(userData));
        dispatch(setLoading(false));
      } catch (error) {
        const errorMessage = typeof error === "string" ? error : "An unknown error occurred";
        dispatch(setError(errorMessage));
        dispatch(setLoading(false));
      }
    };
  };

export default getUserSlice.reducer;
