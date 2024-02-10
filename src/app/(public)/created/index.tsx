import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SuccessIcon from '../../../svg/SuccessIcon';
import styles from './styles';

type CreatedProps = {
    navigation: any; // Adjust the type according to your navigation props
  };
  
  const Created: React.FC<CreatedProps> = ({ navigation }) => {
    useEffect(() => {
      const fakeAsyncTask = setTimeout(() => {
        // Navigate to the main screen or any other screen
        navigation.replace('Home');
      }, 2000);
  
      return () => clearTimeout(fakeAsyncTask);
    }, [navigation]);
  
    return (
      <SafeAreaView style={styles.container}>
        <SuccessIcon />
        <Text style={styles.text}>Account Created Successfully</Text>
      </SafeAreaView>
    );
  };
  
  export default Created;