import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import styles from './styles';

const Settings = () => {
  return (
    <SafeAreaView style={styles.container}>
       <View>
        <Text style={styles.logo}>MEET UP</Text>
      </View>
    </SafeAreaView>
  )
}

export default Settings
