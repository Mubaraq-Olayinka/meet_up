import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import AppIntroSlider from "react-native-app-intro-slider";
import { StackNavigationProp } from '@react-navigation/stack';
// import { router } from "expo-router";

interface Slide {
  id: number;
  title: string;
  description: string;
};

const slides: Slide[] = [
  {
    id: 1,
    title: 'Welcome To Meet Up',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry"s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
  },
  {
    id: 2,
    title: 'Attendance made easy',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry"s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
  },
  {
    id: 3,
    title: 'Looking for a place to go',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry"s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',
  },
];

type AppIntroSliderProps = {
  navigation: StackNavigationProp<any, 'sign-in'>; // Adjust navigation type based on your app's navigation
};
const OnBoarding: React.FC<AppIntroSliderProps> = ({navigation}) => {
  const renderItem = ({ item }: { item: {id: number, title: string, description: string } }) => (
    <SafeAreaView style={styles.slide}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.description}</Text>
    </SafeAreaView>
  );

  const onDone = () => {
    // Handle the onboarding completion (e.g., navigate to the main screen)
    navigation.replace('SignIn')
  };

  return (
    <AppIntroSlider
      renderItem={renderItem}
      data={slides}
      onDone={onDone}
    />
  );
};

export default OnBoarding;
