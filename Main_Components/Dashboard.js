import React ,{useState,useEffect} from 'react';
import { View, Text, StyleSheet,Button,Image,ImageBackground,TouchableOpacity,ActivityIndicator } from 'react-native';
import Dialog from 'react-native-dialog';
 import ConColor from '../Constants/Colors';
import * as Location from 'expo-location';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderComponent from '../Common_Components/HeaderComponent';
import DBStyle from '../styles/DashboardStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import OFZIcon from '../assets/office.svg';
import HomeIcon from '../assets/bhome.svg';
import ClientIcon from '../assets/client.svg';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'; // Optional, if you need it
import localizedFormat from 'dayjs/plugin/localizedFormat'; // For localized formats
import CurrentTime from '../Common_Components/CurrentTime';
import CommonStyle from '../Constants/CommonStyle';
import CheckInIcon from '../assets/check_in.svg';
import CheckOutIcon from  '../assets/check-out.svg';
import StringComponent  from '../Constants/StringComponent';
import APINameComponents from '../Constants/APINameComponents';
import WarningDialog from '../Dialog/WarningDialog';
import FailureDialog from '../Dialog/FailureDialog';
import SuccessDialog from '../Dialog/FailureDialog';
import { err } from 'react-native-svg';
 


 

const Dashboard = () => {
  const date = new Date(); 
  const [dsr_flag,setDSR_Flag] = useState(0);
  const [attTag,setAttTag] = useState('Clock in and Get into Work');
  const formattedDate = dayjs(date).format('dddd, MMMM DD - YYYY');
  const [dialogVisible, setDialogVisible] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [loading, setLoading] = useState(false);
  const [longitude, setLongitude] = useState(null);
  const [username,setUsername]=useState(null);
  const [token,setToken]=useState(null);
  const [deviceid,setDeviceID]=useState(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [projects,setProjects]=useState([]);
  const [successdialogVisible, setsuccessDialogVisible] = useState(false);
  const [failuredialogVisible, setfailureDialogVisible] = useState(false);
  const [warningdialogVisible, setwarningDialogVisible] = useState(false);
  const [sresponsemsg,setsresponsemsg]=useState('');
  const [fresponsemsg,setfresponsemsg]=useState('');
  const [wresponsemsg,setwresponsemsg]=useState('');
  const [checkInEnabled, setCheckInEnabled] = useState(true);
  const [checkOutEnabled, setCheckOutEnabled] = useState(false);
  const [syncid,setSyncId]= useState(null);
  const [punchstatus,setPunchstatus]=useState(0);
  const [workLocation,setworkLocation]=useState('office');
  const [ofzLat,setOfzLat]=useState(11.2391346);
  const [ofzLng,setOfzLng]=useState(78.1654629);
  const [ofzdistance,setOfzDistance] = useState(0);

  const handleLayoutPress = (index) => {
    setSelectedIndex(index);
    if(index===1){
      setworkLocation('office')
    }else if(index===2){
      setworkLocation('home')
    }else{
      setworkLocation('client')
    }
  };





 

  useEffect(() => {
    (async () => {
      //const deviceId = StringComponent.DeviceID;
      const token = await AsyncStorage.getItem('token');
      const username = await AsyncStorage.getItem('EmppName');
      const dv = await AsyncStorage.getItem("deviceid");
      setDeviceID(dv);
      setUsername(username);
     // setDeviceID(deviceId);  
      setToken(token);

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
      const distance = haversineDistance(latitude,longitude,ofzLat,ofzLng);
      setOfzDistance(distance)
      console.log("credentiial "," la "+latitude," lng ",longitude);
      //setLocation({ latitude, longitude });
      console.log("token","as"+token+" deice "+deviceid); 
      getProjectList(token,deviceId);

      let timers = [];
  
      const setupTimer = (isVisible, setVisible) => {
        if (isVisible) {
          const timer = setTimeout(() => {
            setVisible(false);
          }, 3000);
          timers.push(timer);
        }
      };
    
      setupTimer(successdialogVisible, setsuccessDialogVisible);
      setupTimer(failuredialogVisible, setfailureDialogVisible);
      setupTimer(warningdialogVisible, setwarningDialogVisible);
    
      return () => {
        timers.forEach(timer => clearTimeout(timer));
      };


     })();
  }, [successdialogVisible, failuredialogVisible, warningdialogVisible]);
 




  const toRad = (value) => {
    return (value * Math.PI) / 180;
  };
  
  const haversineDistance = (lat1, lng,ofzLat,ofzLng) => {
     const R = 6371000; // Radius of the Earth in km
    const dLat = toRad(ofzLat - lat1);
    const dLon = toRad(ofzLng - lng);
    
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(ofzLat)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c; // Distance in km
  };
  


  
const getProjectList = async (token,deviceId) => {
  console.log("token"," main "+token+" id "+deviceId);

  setLoading(true);
  
  try {
    const response = await fetch(StringComponent.APIURL+APINameComponents.project_list, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
        'Device-ID': deviceId,
      },
    });

    const data = await response.json();

    console.log("responesr "," as "+" json "+data.status+" data "+data.data);

    if (response.status === 200) {
        if(data.status==='success'){
            const projectList = data.data;
            console.log("respon "," val "+projectList+" status "+data.status);
            if (projectList.length > 0) {
              setProjects(projectList);        
            }
        }
      
    } else if (response.status === 401 || response.status === 403) {
       // Clear all data or handle logout
     }
  } catch (error) {
    } finally {
    setLoading(false);
    checkAttendancePunchOrNot(token,deviceId);

  }
};
const checkAttendancePunchOrNot = async (token,deviceId) => {
  console.log("punchincalled");
  setLoading(true);

  try {
    const response = await fetch(StringComponent.APIURL+APINameComponents.check_atten, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
        'Device-ID': deviceId,
      },
    });
    const data = await response?.json();
      setLoading(false);
      if (response?.status === 200) {
           
          if (data?.status === "success") {
              const { punch_status, sync_id, dsr_flag } = data.data;
              console.log("res",data.data);
               setDSR_Flag(dsr_flag)
              setPunchstatus(punch_status)
              setSyncId(sync_id)
              console.log("sye "+sync_id+" sett "+syncid+ " f "+dsr_flag+" st "+punchstatus);

                if (punchstatus===0) {
                   // Punch in logic
                  setAttTag("Clock in and Get into Work");
                  setCheckInEnabled(true);
                  setCheckOutEnabled(false);
                  // Save to AsyncStorage or state
              } else {
                  // Punch out logic
                   setAttTag("Clock out and Have a Great Day");
                  setCheckInEnabled(false);
                  setCheckOutEnabled(true);
                  // Save to AsyncStorage or state
              }
          }else{

          } 
      } else if (response.status === 401 || response.status === 403) {

           // Clear data logic
      } else {
           
      }
  } catch (error) {
      console.log(error);
      setLoading(false);
      
  }
};

 
const PunchoutAttendance = async () => {
  console.log("punchincalled");
  setLoading(true);


  console.log("tok "+token+" dv "+deviceid+" sy "+syncid+" l "+latitude+" lng "+longitude+" loca "+workLocation);

  try {
    const response = await fetch(StringComponent.APIURL+APINameComponents.atten_punchout, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
        'Device-ID': deviceid,
      },
      body: JSON.stringify({
        sync_id: syncid,
        latitude: latitude,
        longitude: longitude,
        pout_work_location: workLocation,
      }),
    });
    const data = await response.json();
    console.log("data"," as "+data);
    setLoading(false);
       
  } catch (error) {
      console.log(error);
      setLoading(false);
      
  }
};

const checkInConditionWork =()=>{
  if(selectedIndex==1){
      if(ofzdistance>150){
        setwresponsemsg('You are not belong to office location')
        setwarningDialogVisible(true)
        return
      }else{
        const work='office';
        setworkLocation('office');
            if(selectedIndex===1){
              setworkLocation('office');
            }else if(selectedIndex===2){
              setworkLocation('home');
            }else if(selectedIndex===3){
              setworkLocation('client');
            }

            callCheckInAPI();
      }
  }else{
    const work='office';
    setworkLocation('office');
        if(selectedIndex===1){
          setworkLocation('office');
        }else if(selectedIndex===2){
          setworkLocation('home');
        }else if(selectedIndex===3){
          setworkLocation('client');
        }
        callCheckInAPI()
  }
};

const callCheckInAPI = async () => {
  console.log("punchincalled");
  setLoading(true);


  console.log("tok "+token+" dv "+deviceid+" sy "+syncid+" l "+latitude+" lng "+longitude+" loca "+workLocation);

  try {
    const response = await fetch(StringComponent.APIURL+APINameComponents.atten_punchin, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
        'Device-ID': deviceid,
      },
      body: JSON.stringify({
         latitude: latitude,
        longitude: longitude,
        pout_work_location: workLocation,
      }),
    });
    const data = await response.json();
    console.log("data"," as "+data+" response stauts "+response.status);
    setLoading(false);
    if(response.status===200){
    }
       
  } catch (error) {
      console.log(error);
      setLoading(false);
      
  }
};


const checkOutConditionChecking = () =>{
  const work='office';
  setworkLocation('office');
      if(selectedIndex===1){
        setworkLocation('office');
      }else if(selectedIndex===2){
        setworkLocation('home');
      }else if(selectedIndex===3){
        setworkLocation('client');
      }
    if(latitude==null){
      setwresponsemsg('Location Not available')
      setwarningDialogVisible(true);
    }else if(syncid===''){
      setwresponsemsg('Sync Id Not Present')
      setwarningDialogVisible(true);
    }else{
      PunchoutAttendance();

    }
};

   
   

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
                <TouchableOpacity style={[DBStyle.layout,  selectedIndex === 1  &&  CommonStyle.org_background]}
                  onPress={() => handleLayoutPress(1)}
                >
                  <OFZIcon style={DBStyle.selection_icon} />
                  <Text style={DBStyle.selection_text}>Office</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[DBStyle.layout,DBStyle.outer_layout,   selectedIndex === 2 &&  CommonStyle.org_background]}
                                  onPress={() => handleLayoutPress(2)}

                >
                  <HomeIcon style={DBStyle.selection_icon} />
                  <Text style={DBStyle.selection_text}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[DBStyle.layout,DBStyle.outer_layout,  selectedIndex === 3 &&  CommonStyle.org_background]}
                                   onPress={() => handleLayoutPress(3)}

                >
                  <ClientIcon style={DBStyle.selection_icon} />
                  <Text style={DBStyle.selection_text}>CLIENT</Text>
                </TouchableOpacity>
           </View>


          <View style={CommonStyle.outer_padding_box}>          
            <View>
                <View style={DBStyle.date_outer}>
                  <Image source={require('../assets/eye_show.png')} style={[DBStyle.selection_icon,{tintColor:ConColor.n_org}]}/>
                  <Text style={[DBStyle.date_display_text]}>{formattedDate}</Text>
                </View>
            </View>
            <CurrentTime />
            <View style={{alignItems:'center',alignSelf:'center'}}>
              <Image source={require('../assets/attendance_image.png')} />
            </View>
            <Text style={CommonStyle.smallText}>{attTag}</Text>
           </View>
           {loading && (
        <ActivityIndicator
        size="large"
        color={ConColor.n_blue} // Use the color for the loader
        style={CommonStyle.loader}
      />
      )}



           <View style={DBStyle.shapecontainer}>
            <TouchableOpacity onPress={checkInConditionWork} disabled={!checkInEnabled} style={[CommonStyle.padding_button, checkInEnabled
               && CommonStyle.org_background]}>
                <CheckInIcon
                    style={CommonStyle.check_icon}
                />
                <Text style={CommonStyle.check_text}>Check In</Text>
            </TouchableOpacity>
            <TouchableOpacity disabled={!checkOutEnabled}  
            onPress={checkOutConditionChecking}
            style={[CommonStyle.padding_button , checkOutEnabled && CommonStyle.org_background]}>
                <CheckOutIcon
                    style={CommonStyle.check_icon}
                     
                />
                <Text style={CommonStyle.check_text}>Check Out</Text>
            </TouchableOpacity>
        </View>



           

          </View>
          <HeaderComponent title={username} />
          <WarningDialog      
        visible={warningdialogVisible}
        onClose={() => setwarningDialogVisible(false)} 
         message={wresponsemsg}
       />
       <SuccessDialog      
        visible={successdialogVisible}
        onClose={() => setsuccessDialogVisible(false)} 
         message={sresponsemsg}
       />
       <FailureDialog      
        visible={failuredialogVisible}
        onClose={() => setfailureDialogVisible(false)} 
         message={fresponsemsg}
       />
      
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