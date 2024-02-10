// slices/eventSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Attendees {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  attendanceTime: string;
}

interface EventState {
  attendees: Attendees[];
  loading: boolean;
  error: string | null;
}

const initialState: EventState = {
  attendees: [],
  loading: false,
  error: null,
};

export const attendEvent = createAsyncThunk(
  'events/attendEvent',
  async (eventId: string, thunkAPI,) => {
    try {
      const user = auth().currentUser;
      if (!user) {
        throw new Error('User not authenticated');
      }
      const currentTime = new Date().toISOString(); // Get current date and time
      const eventRef = firestore().collection('Event').doc(eventId);
      const eventDoc = await eventRef.get();
      if (!eventDoc.exists) {
        throw new Error('Event not found');
      }

      const event = eventDoc.data();
      if (!event) {
        throw new Error('Event data is undefined');
      }
      console.log(await AsyncStorage.getItem('user'));
      const userInfo = await AsyncStorage.getItem('user');
      const userData = JSON.parse(userInfo || '{}');
      console.log(userData)
      const updatedAttendees: Attendees[] = [
        ...event.attendees,
        {
          userId: user.uid,
          email: user.email || '',
          attendanceTime: currentTime,
          displayName: userData.userData.firstName + ' ' + userData.userData.lastName
          // firstName: userData ? userData.firstName : '',
          // lastName: userData ? userData.lastName : ''
        },
      ];
      await eventRef.update({ attendees: updatedAttendees });
      return updatedAttendees;
    } catch (error) {
      const errorMessage = typeof error === 'string' ? error : 'An unknown error occurred';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

const attendEventSlice = createSlice({
  name: 'attendEvent',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(attendEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(attendEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.attendees = action.payload;
      })
      .addCase(attendEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default attendEventSlice.reducer;
