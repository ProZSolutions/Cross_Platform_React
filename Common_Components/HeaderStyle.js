import { StyleSheet } from "react-native";
import Colors from "../Constants/Colors";

const styles = StyleSheet.create({
    container: {
      width:'100%',
       flex: 0.6,
      backgroundColor: Colors.n_blue, // Change to your color
      paddingTop: 15,
    },
    innerContainer: {
      flexDirection: 'row',
      alignItems: 'start',
      textAlign:'left',
      paddingHorizontal: 15,
    },
    iconContainer: {
      marginRight: 10,
    },
    icon: {
      width: 25,
      height: 25,
    },
    title: {
      fontSize: 18,
      color: 'white',
       flex: 1,
      textAlign: 'left',
    },
    iconsContainer: {
      flexDirection: 'row',
    },
  });
  export default styles;
  