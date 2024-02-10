import React, { useEffect } from "react";
import { View, Text, Button, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { SafeAreaView, } from "react-native-safe-area-context";
import styles from "./styles";
import SettingsIcon from "../../../svg/SettingsIcon";
import Event from "../../../components/event";
import {fetchEvents} from '../../../redux/slices/eventSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { StackNavigationProp } from "@react-navigation/stack";
import Snackbar from "react-native-snackbar";

type HomeProps = {
  navigation: StackNavigationProp<any, "AddEvent">;
};

const Home = ({navigation}: HomeProps) => {
  const dispatch = useAppDispatch();
  const { events, loading, error } = useAppSelector((state) => state.event);
  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);
  const handleEventPress = () => {
    navigation.replace("AddEvent");
  };
  // const events = [
  //   {
  //     id: 1,
  //     title: "lorem ipsum dolor",
  //     date: "lorem",
  //     time: "lorem",
  //     location: "lorem ipsum dolor",
  //   },
  //   {
  //       id: 2,
  //       title: "lorem ipsum dolor",
  //       date: "lorem",
  //       time: "lorem",
  //       location: "lorem ipsum dolor",
  //     },
  //     {
  //       id: 3,
  //       title: "lorem ipsum dolor",
  //       date: "lorem",
  //       time: "lorem",
  //       location: "lorem ipsum dolor",
  //     },
  // ];
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.logo}>MEET UP</Text>
        <View style={styles.topRight}>
          <Button
            title="Add Event"
            onPress={handleEventPress}
            color="#A9A9A9"
          />
          <TouchableOpacity onPress={() => navigation.replace("Settings")}>
          <SettingsIcon />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        {loading && <ActivityIndicator />}
        {events.map((event) => {
            return <Event key={event.id} id={event.id} title={event.title} date={event.date} time={event.time} location={event.location} />
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
