import { StyleSheet } from "react-native";
import Colors  from "../Constants/Colors";


const styles = StyleSheet.create({
    container: {
        flexDirection:'column',
        flex:1,
        backgroundColor: Colors.n_blue, // Replace with your color
      },
      outer_container:{
        flex:8
      },
      rounded_rect:{
        backgroundColor: 'white', // Replace with your color value
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        height: '100%', // Adjust height as needed
        width: '100%', 
      },
      header_container:{
        flexDirection: 'row',
        margin: 15,
        alignItems: 'center',
      },
      left_arrow:{
        marginRight: 17,
        width: 25,
        height: 25,
      },
      header_title:{
        fontSize: 14,
        color:Colors.n_blue
      },
      rect_container:{
        flexDirection: 'row',
        margin:4,
        width: '100%',
        height: 40,
      },
      layout: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
     
      },
      outer_layout:{
         backgroundColor: Colors.n_org,
        marginLeft:1,
 
      },
      selection_icon:{
         width: 20,
        height: 20,
        tintColor: '#ffffff',
      },
      selection_text:{
         marginLeft: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        color: '#ffffff',
        textTransform: 'uppercase',
        fontSize: 12,
      }
  });
  export default styles;
