import React, { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import { StackNavigationProp } from "@react-navigation/stack";
import { Formik } from "formik";
import * as Yup from "yup";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { useDispatch, useSelector } from 'react-redux';
import { postEvent } from "../../../redux/slices/addEventSlice";
import { RootState } from "../../../redux/store";

type AddEventProps = {
  navigation: StackNavigationProp<any, "Home">;
};

interface AddEventValues {
  title: string;
  date: string;
  time: string;
  description: string;
  location: string;
}

const AddEventSchema = Yup.object().shape({
  title: Yup.string().required("This field is required"),
  // date: Yup.string().required("This field is required"),
  // time: Yup.string().required("This field is required"),
  description: Yup.string().required("This field is required"),
  location: Yup.string().required("This field is required"),
});

const AddEvent = ({ navigation }: AddEventProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<any>();
  const handleAddEvent = (values: AddEventValues) => {
    setIsLoading(true);
    const formattedDate = selectedDate ? moment(selectedDate).format('MMMM Do YYYY') : '';
    const formattedTime = selectedTime ? moment(selectedTime).format('h:mm A') : '';
    const event = { ...values, date: formattedDate, time: formattedTime };
    dispatch(postEvent(event));
    navigation.replace('Home');
  };
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const picker = () => {
    setDatePickerVisibility(true);
  };

  const timePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirm = (date: React.SetStateAction<Date>) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const handleTimeConfirm = (time: React.SetStateAction<Date>) => {
    setSelectedTime(time);
    hideTimePicker();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>MEET UP</Text>
      <View style={styles.form}>
        <Formik
          initialValues={{
            title: "",
            date: "",
            time: "",
            description: "",
            location: "",
          }}
          onSubmit={handleAddEvent}
          validateOnMount
          validationSchema={AddEventSchema}
        >
          {({ handleChange, handleSubmit, values, touched, errors }) => {
            const { title, date, time, location, description } = values;
            return (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Event Name"
                  placeholderTextColor="#A9A9A9"
                  keyboardType="default"
                  autoCapitalize="none"
                  value={title}
                  onChangeText={handleChange("title")}
                />
                {touched.title ? <Text>{errors.title}</Text> : ""}
                <View>
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Event Date"
                    placeholderTextColor="#A9A9A9"
                    keyboardType="default"
                    autoCapitalize="none"
                    value={moment(selectedDate).format('MMMM Do YYYY')}
                    onChangeText={handleChange("date")}
                    onPressIn={picker}
                  />
                  {touched.date ? <Text>{errors.date}</Text> : ""}
                </View>
                <View>
                  <DateTimePickerModal
                    isVisible={isTimePickerVisible}
                    mode="time"
                    onConfirm={handleTimeConfirm}
                    onCancel={hideTimePicker}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Event Time"
                    placeholderTextColor="#A9A9A9"
                    keyboardType="default"
                    autoCapitalize="none"
                    value={moment(selectedTime).format('h:mm A')}
                    onChangeText={handleChange("time")}
                    onPressIn={timePicker}
                  />
                  {touched.time ? <Text>{errors.time}</Text> : ""}
                </View>
                
                {/* <GooglePlacesAutocomplete
                  placeholder="Event Location"
                  onPress={(data) => {
                    handleChange("location")(data.description);
                  }}
                  query={{
                    key: "AIzaSyBFWS74gRSAgF9koc7u0M0sZ4tF6PXCegU",
                    language: "en",
                  }}
                  styles={{
                    textInput: styles.input,
                  }}
                /> */}
                <TextInput
                  style={styles.input}
                  placeholder="Event Location"
                  placeholderTextColor="#A9A9A9"
                  keyboardType="default"
                  autoCapitalize="none"
                  value={location}
                  onChangeText={handleChange("location")}
                />
                {touched.location ? <Text>{errors.location}</Text> : ""}
                <TextInput
                  style={styles.input}
                  placeholder="Tell us about your event"
                  multiline={true}
                  placeholderTextColor="#A9A9A9"
                  secureTextEntry
                  value={description}
                  onChangeText={handleChange("description")}
                />
                {touched.description ? <Text>{errors.description}</Text> : ""}
                <View style={styles.loginButton}>
                  <Button
                    title="Add Event"
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

export default AddEvent;
