import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet  ,Dimensions ,Image,SafeAreaView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

//constant asset settings
 
import { ImageBackground } from 'react-native';
//end constant asset settings

import LoginScreen from './LoginScreen';
import Dashboard from './Dashboard';



const SplashScreen = () => {
    const navigation = useNavigation();
  
    useEffect(() => {
      const checkToken = async () => {
        try {
          // Simulate a delay
          setTimeout(async () => {
            const token = await AsyncStorage.getItem('token');
            console.log("token"," as "+token); 
            if (!token) {
              navigation.navigate('LoginScreen');
            } else {
              navigation.navigate('Dashboard');
            }
          }, 5000); // Delay of 5 seconds
        } catch (error) {
          console.error(error);
        }//
      };
  
      checkToken();
    }, [navigation]); 
  
    return (
        <SafeAreaView style={styles.container}>
        <SafeAreaView style={styles.innerContainer}>
             <ImageBackground source={require('../assets/archi.png')} style={styles.linearLayout} resizeMode={'cover'}>
              <Image source={require('../assets/proz_logo.png')} style={styles.image} resizeMode={'cover'}/>
            </ImageBackground>
        </SafeAreaView>
      </SafeAreaView>
    );
  };
  
  const { width } = Dimensions.get('window');

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fafafa',  
      justifyContent: 'center',
      alignItems: 'center',
    },
    innerContainer: {
      width: width,
      alignItems: 'center',
    },
    linearLayout: {
      margin: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fafafa',  
      padding: 10,  
      width:350 , 
      height: 350, 
    },
    image: {
      width:150 , 
      height: 150, 
    },
  });
  
  export default SplashScreen;