import React, { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import { StackNavigationProp } from "@react-navigation/stack";
import Snackbar from "react-native-snackbar";
import auth from "@react-native-firebase/auth";
import { Formik } from "formik";
import * as Yup from "yup";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch, useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';

type SignUpProps = {
  navigation: StackNavigationProp<any, "Home">;
};

interface SignUpValues {
  email: string;
  password: string;
  firstName: string; 
  lastName: string;
  location: string;
  confirmPassword: string
}

const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email must be a valid email address")
    .required("This field is required"),
  password: Yup.string().required("This field is required"),
});

const SignUp = ({ navigation }: SignUpProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleSignUp = async (values: SignUpValues) => {
    setIsLoading(true);
    auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .then(async (userCredential) => {
        // Signed up
        const user = userCredential.user;
        await user.updateProfile({
          displayName: values.firstName + ' ' + values.lastName,
        });
        await user?.reload();
        console.log('Updated displayName:', user.displayName);
        await firestore().collection('Users').doc(user.uid).set({
          email: user.email,
          firstName: values.firstName,
          lastName: values.lastName,
          location: values.location
          // Add other user data fields as needed
        });
        console.log(user);
        setIsLoading(false);
        navigation.replace("Created");
        // ...
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);

        Snackbar.show({
          text: error.message,
          backgroundColor: "#A9A9A9",
          textColor: "#343434",
        });
      });
     
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>MEET UP</Text>
      <View style={styles.form}>
        <Formik
          initialValues={{
            email: "",
            firstName: "",
            lastName: "",
            password: "",
            location: "",
            confirmPassword: "",
          }}
          onSubmit={handleSignUp}
          validateOnMount
          validationSchema={SignUpSchema}
        >
          {({ handleChange, handleSubmit, values, touched, errors }) => {
            const {
              email,
              password,
              firstName,
              lastName,
              location,
              confirmPassword,
            } = values;
            return (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="First Name"
                  placeholderTextColor="#A9A9A9"
                  keyboardType="default"
                  autoCapitalize="none"
                  value={firstName}
                  onChangeText={handleChange("firstName")}
                />
                {touched.firstName ? <Text>{errors.firstName}</Text> : ""}
                <TextInput
                  style={styles.input}
                  placeholder="Last Name"
                  placeholderTextColor="#A9A9A9"
                  keyboardType="default"
                  autoCapitalize="none"
                  value={lastName}
                  onChangeText={handleChange("lastName")}
                />
                {touched.lastName ? <Text>{errors.lastName}</Text> : ""}
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
                <GooglePlacesAutocomplete
                  placeholder="Location"
                  onPress={(data, details = null) => {
                    // 'data' is an object with information about the selected place
                    // 'details' is an object with detailed information about the selected place
                    handleChange("location")(data.description);
                  }}
                  query={{
                    key: "YOUR_GOOGLE_PLACES_API_KEY",
                    language: "en",
                  }}
                  styles={{
                    textInput: styles.input,
                  }}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Location"
                  placeholderTextColor="#A9A9A9"
                  keyboardType="default"
                  autoCapitalize="none"
                  value={location}
                  onChangeText={handleChange("location")}
                />
                {touched.location ? <Text>{errors.location}</Text> : ""}
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#A9A9A9"
                  secureTextEntry
                  value={password}
                  onChangeText={handleChange("password")}
                />
                {touched.password ? <Text>{errors.password}</Text> : ""}
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  placeholderTextColor="#A9A9A9"
                  secureTextEntry
                  value={confirmPassword}
                  onChangeText={handleChange("confirmPassword")}
                />
                {touched.confirmPassword ? (
                  <Text>{errors.confirmPassword}</Text>
                ) : (
                  ""
                )}
                <View style={styles.loginButton}>
                  <Button
                    title="SignUp"
                    onPress={() => handleSubmit()}
                    color="#343434"
                  />
                </View>
              </>
            );
          }}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
function then(arg0: (userCredential: { user: any }) => void) {
  throw new Error("Function not implemented.");
}
