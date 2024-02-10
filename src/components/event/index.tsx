import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import styles from "./styles";
import DateIcon from "../../svg/DateIcon";
import TimeIcon from "../../svg/TimeIcon";
import LocationIcon from "../../svg/LocationIcon";
import { attendEvent } from "../../redux/slices/attendEventSlice";
import { useDispatch, useSelector } from "react-redux";

interface EventProps {
  title: string;
  date: string;
  time: string;
  location: string;
  id: string
}

const Event = ({ title, date, time, location, id }: EventProps,) => {
  const dispatch = useDispatch()<any>;
  const [attend, setAttend] = useState(false);

  const handlePress = () => {
    dispatch(attendEvent(id));
    setAttend(true);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.dateTime}>
        <View style={styles.aside}>
          <DateIcon />
          <Text style={styles.asideText}>{date}</Text>
        </View>
        <View style={styles.aside}>
          <TimeIcon />
          <Text style={styles.asideText}> {time}</Text>
        </View>
      </View>
      <View style={styles.location}>
        <View style={styles.aside}>
          <LocationIcon /> 
          <Text style={styles.asideText}>{location}</Text>
        </View>
        <Button
          title={attend ? "Noted" : "Attend"}
          onPress={handlePress}
          color="#A9A9A9"
        />
      </View>
    </View>
  );
};

export default Event;
