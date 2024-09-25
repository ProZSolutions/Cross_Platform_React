import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import HeaderStyle from './HeaderStyle';


const Header = ({ title, onBackPress }) => {
  return (
    <View style={HeaderStyle.container}>
      <View style={HeaderStyle.innerContainer}>
        
        <Text style={HeaderStyle.title}>{title}</Text>
        <View style={HeaderStyle.iconsContainer}>
          <Image
            style={HeaderStyle.icon}
            source={require('../assets/notification.png')}  
          />
          <Image
            style={[HeaderStyle.icon, { marginLeft: 17 }]}
            source={require('../assets/profile.png')}  
          />
        </View>
      </View>
    </View>
  );
};


export default Header;
