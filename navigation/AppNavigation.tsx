import Splash from "../src/components/splash";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import OnBoarding from "../src/app/(public)/onBoarding";
import SignIn from "../src/app/(public)/sign-in";
import SignUp from "../src/app/(public)/sign-up";
import Created from "../src/app/(public)/created";
import Home from "../src/app/(public)/home";
import AddEvent from "../src/app/(public)/add-event";
import Settings from "../src/app/(public)/settings";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../src/redux/store";
import { initializeUser } from "../src/redux/slices/userSlice";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

const Stack = createStackNavigator();

export default function App() {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(initializeUser());
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="SplashScreen" component={Splash} />
        <Stack.Screen name="OnBoarding" component={OnBoarding} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Created" component={Created} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddEvent" component={AddEvent} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
