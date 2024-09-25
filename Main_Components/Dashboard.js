import React ,{useState,useEffect} from 'react';
import { View, Text, StyleSheet,Button } from 'react-native';
import Dialog from 'react-native-dialog';
import WarningDialog from '../Dialog/WarningDialog';
import ConColor from '../Constants/Colors';


 

const Dashboard = () => {
  const [dialogVisible, setDialogVisible] = useState(false);

  const showDialog = () => {
    setDialogVisible(true);
    setTimeout(() => {
      setDialogVisible(false);
    }, 3000); // 3 seconds
    
  };
   
  const hideDialog = () => {
    setDialogVisible(false);
  };
   

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Custom Dialog Example</Text>
      <Button title="Show Dialog" onPress={showDialog} />
      <WarningDialog      
        visible={dialogVisible}
         message="Success"
       />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Dashboard;