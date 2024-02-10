import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import GoogleIcon from "../../../svg/GoogleIcon";
import { StackNavigationProp } from "@react-navigation/stack";
import { Formik } from "formik";
import * as Yup from "yup";
import Snackbar from "react-native-snackbar";
import auth from "@react-native-firebase/auth";
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../../redux/slices/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootState } from "../../../redux/store";

type SignInProps = {
  navigation: StackNavigationProp<any, "Home">;
};

interface SignInValues {
  email: string;
  password: string;
}

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email must be a valid email address")
    .required("This field is required"),
  password: Yup.string().required("This field is required"),
});

const SignIn = ({ navigation }: SignInProps) => {
  const dispatch = useDispatch<any>();
  const [isLoading, setIsLoading] = useState(false)
  const handleLogin = async (values : SignInValues) => {
    setIsLoading(true)
    try {
      await dispatch(login(values.email, values.password));
      navigation.replace("Home");
    } catch(error) {
      setIsLoading(false)
    }
    }
    // auth()
    //   .signInWithEmailAndPassword(values.email, values.password)
    //   .then(() => {
    //     setIsLoading(false)
    //     navigation.replace("Home");
    //   })
    //   .catch((error) => {
    //     setIsLoading(false);
    //     console.log(error);

    //     Snackbar.show({
    //       text: error.message,
    //       backgroundColor: "#A9A9A9",
    //       textColor: "#343434",
    //     });
    //   });

  const handleGoogleLoginPress = () => {
    navigation.replace("Home");
  };
  const handlePress = () => {
    navigation.replace("SignUp");
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>MEET UP</Text>
      <View style={styles.form}>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={handleLogin}
          validateOnMount
          validationSchema={SignInSchema}
        >
          {({ handleChange, handleSubmit, values, touched, errors }) => {
            const { email, password } = values;
            return (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#A9A9A9"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={handleChange("email")}
                />
                {touched.email ? <Text>{errors.email}</Text> : ""}
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#A9A9A9"
                  secureTextEntry
                  value={password}
                  onChangeText={handleChange("password")}
                />
                {touched.password ? <Text>{errors.password}</Text> : ""}
                <View style={styles.loginButton}>
                  {isLoading ? (
                    <ActivityIndicator color="#343434" />
                  ) : (
                    <Button
                      title="Sign In"
                      onPress={() => handleSubmit()}
                      color="#343434"
                    />
                  )}
                </View>
              </>
            );
          }}
        </Formik>
      </View>
      <View style={styles.bottom}>
        <View style={styles.googleLoginButton}>
          <Button
            title="Login with Google"
            onPress={handleGoogleLoginPress}
            color="#343434"
          />
          <GoogleIcon />
        </View>
        <Text>
          Don't have an account?{" "}
          <TouchableOpacity onPress={handlePress}>
            <Text style={styles.bottomButton}>Sign Up</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
