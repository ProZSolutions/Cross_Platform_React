import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import HeaderStyle from './HeaderStyle';
 

const Header = ({ title }) => {
  return (
    <View style={HeaderStyle.container}>
      <View style={HeaderStyle.innerContainer}>
        
      <Text style={HeaderStyle.headerTitle}>{title}</Text>
        
      </View>
    </View>
  );
};


export default Header;
