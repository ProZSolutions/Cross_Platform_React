import { StyleSheet } from "react-native";
import Colors from "../Constants/Colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.n_blue, // Replace with your color value
    paddingTop: 15,
    paddingBottom: 15,
    flex:1,
},
    innerContainer: {
      flexDirection: 'row',
      marginHorizontal: 15,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerTitle:{
      marginTop:5,
      fontSize: 18,
       color: 'white',
    }
   
   
  });
  export default styles;
  