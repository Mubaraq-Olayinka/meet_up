import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import styles from './styles';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import auth from "@react-native-firebase/auth";
// import { getCurrentUser } from '../../../redux/slices/getUserSlice';
import { fetchUserData } from '../../../redux/slices/getUserSlice';
import { firebase } from '@react-native-firebase/auth'; 
import { useDispatch } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { logout } from '../../../redux/slices/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SignOutProps = {
  navigation: StackNavigationProp<any, "SignIn">;
};

const Settings = ({ navigation }: SignOutProps) => {
  const dispatch = useDispatch<any>();
  const [isLoading, setIsLoading] = useState(false)
  const userData = useAppSelector<any>((state) => state.getUser.userData);
  const currentUser = firebase.auth().currentUser
  
  // useEffect(() => {
  //   dispatch(getCurrentUser());
  // }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      console.log(currentUser)
      dispatch(fetchUserData(currentUser.uid));
    }
  }, [dispatch, currentUser]);

  const handlePress = async () => {
    // console.log(user)
    setIsLoading(true)
    try {
      await dispatch(logout());
      navigation.replace("SignIn");
      console.log(await AsyncStorage.getItem('user'))
    } catch(error) {
      setIsLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.logo}>MEET UP</Text>
        <View style={styles.center}>
          <Text style={styles.header}>First Name</Text>
          <Text style={styles.text}>{userData?.firstName}</Text>
          <View style={styles.line}></View>
          <Text style={styles.header}>Last Name</Text>
          <Text style={styles.text}>{userData?.lastName}</Text>
          <View style={styles.line}></View>
          <Text style={styles.header}>Email</Text>
          <Text style={styles.text}>{userData?.email}</Text>
          <View style={styles.line}></View>
          <Text style={styles.header}>Location</Text>
          <Text style={styles.text}>{userData?.location}</Text>
        </View>
        <View>
          <Button title='Log Out' color="#A9A9A9" onPress={handlePress} />
        </View>
    </SafeAreaView>
  )
}

export default Settings
