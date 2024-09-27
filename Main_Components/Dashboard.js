import React ,{useState,useEffect} from 'react';
import { View, Text, StyleSheet,Button,Image,ImageBackground } from 'react-native';
import Dialog from 'react-native-dialog';
import WarningDialog from '../Dialog/WarningDialog';
import ConColor from '../Constants/Colors';
import * as Location from 'expo-location';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderComponent from '../Common_Components/HeaderComponent';
import DBStyle from '../styles/DashboardStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OFZIcon from '../assets/office.svg';
import HomeIcon from '../assets/bhome.svg';
import ClientIcon from '../assets/client.svg';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'; // Optional, if you need it
import localizedFormat from 'dayjs/plugin/localizedFormat'; // For localized formats

 


 

const Dashboard = () => {
  const formattedDate = dayjs(date).format('dddd, MMMM DD - YYYY');
  const [dialogVisible, setDialogVisible] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [username,setUsername]=useState(null);
 

  useEffect(() => {
    (async () => {
      
      const username = await AsyncStorage.getItem('EmppName');
      setUsername(username);


      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      
      console.log(" locatoin "," as "+JSON.stringify(location));
      const { latitude, longitude } = location.coords;
      setLatitude(latitude);
      setLongitude(longitude);
      console.log("credentiial "," la "+latitude," lng ",longitude);
      //setLocation({ latitude, longitude });
     })();
  }, []);
 


   
   

  return (
    <View
      style={[
        styles.container, { flexDirection: 'column', }, ]}>
          <HeaderComponent title={username} />
          <View style={[DBStyle.rounded_rect,{flex: 22}]} >
            <View style={DBStyle.header_container}>
               <Image source={require('../assets/eye_show.png')} style={DBStyle.left_arrow}/>
               <Text style={DBStyle.header_title}>Choose Your Work Location</Text>
             </View> 



             <View style={DBStyle.rect_container}>
                <View style={[DBStyle.layout, {backgroundColor:ConColor.n_org}]}>
                  <OFZIcon style={DBStyle.selection_icon} />
                  <Text style={DBStyle.selection_text}>Office</Text>
                </View>

                <View style={[DBStyle.layout,DBStyle.outer_layout,  {backgroundColor:ConColor.n_blue}]}>
                  <HomeIcon style={DBStyle.selection_icon} />
                  <Text style={DBStyle.selection_text}>Home</Text>
                </View>

                <View style={[DBStyle.layout,DBStyle.outer_layout, {backgroundColor:ConColor.n_blue}]}>
                  <ClientIcon style={DBStyle.selection_icon} />
                  <Text style={DBStyle.selection_text}>CLIENT</Text>
                </View>
           </View>

           <View>
              <View>
                <Image source={require('../assets/eye_show.png')} style={[DBStyle.selection_icon,{tintColor:ConColor.n_org}]}/>
                <Text style={[DBStyle.date_display_text]}>{formattedDate}</Text>
              </View>
           </View>


          </View>
          <HeaderComponent title={username} />
      
    </View>
      
       
   );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
});

export default Dashboard;