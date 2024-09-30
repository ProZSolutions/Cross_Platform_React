import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';
import DBStyle from '../styles/DashboardStyle';
import ConColor from '../Constants/Colors';

const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
       <View>
       <View style={[DBStyle.date_outer,{marginTop:3}]}>
         <Image source={require('../assets/eye_show.png')} style={[DBStyle.selection_icon,{tintColor:ConColor.n_org}]}/>
         <Text style={[DBStyle.date_display_text]}> {currentTime.toLocaleTimeString()}</Text>
       </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  timeText: {
    fontSize: 48,
    fontWeight: 'bold',
  },
});

export default CurrentTime;
