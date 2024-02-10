import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';

// Import your other screen components
import OnBoarding from '../../app/(public)/onBoarding';

type SplashScreenProps = {
  navigation: any; // Adjust the type according to your navigation props
};

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  useEffect(() => {
    const fakeAsyncTask = setTimeout(() => {
      // Navigate to the main screen or any other screen
      navigation.replace('OnBoarding');
    }, 2000);

    return () => clearTimeout(fakeAsyncTask);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.splashText}>MEET UP</Text>
    </SafeAreaView>
  );
};

export default SplashScreen
