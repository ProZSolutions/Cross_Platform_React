import { StyleSheet } from "react-native";
import Colors from "./Colors";


const styles = StyleSheet.create({
    container: {
      width:'100%',
      height:'100%',
      flex: 10,
        backgroundColor: '#FFFFFF',  
       paddingTop: 15,
    },




   
    
      versionCode: {
        fontSize: 12,
        color: '#808080', // Use gray color
        textAlign: 'center',
        marginTop: 10,
      },
      inputContainer: {
        flexDirection: 'row',
        borderColor:Colors.n_outer,
        borderWidth:0.6,
        alignItems: 'center',
        backgroundColor: 'white', // Use a background similar to rectangle_outer_gray
        borderRadius: 5,
        marginTop: 15,
        marginRight:20,
        marginLeft:20
      },
      icon: {
        width: 20,
        height: 20,
        marginLeft: 5,
        tintColor:Colors.n_org
          },
      input: {
        flex: 1,
        padding: 8,
        fontSize: 13,
        color: '#000', // Use black color
        backgroundColor: '#fff', // Use a background similar to line_white
      },
      passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
      },
      forgotPassword: {
        fontSize: 14,
        color: '#000', // Use black color
        textAlign: 'right',
        marginTop: 10,
        marginRight:20,
      },
      loader: {
        alignSelf: 'center',
        marginTop: 20,
      },
      button: {
        width:'30%',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#4CAF50', // Use n_green color
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
      },
      buttonIcon: {
        marginRight: 10,    
            width: 20,
            height: 20,
            borderRadius: 10, // 50% of width and height
            backgroundColor: 'white', // Circle color
          
      },
      buttonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
        textTransform: 'uppercase',
      },
      smallText: {
         color: Colors.gray,
        fontSize: 12,
          alignItems:'center',
        alignSelf:'center'
       },
       padding_button:{
       
          backgroundColor: Colors.n_blue, // Replace with your color or use a dynamic value
           borderColor: '#000', // Change to your border color
          borderRadius: 18,
          paddingLeft: 10,
          marginRight: 10,
          height: 40,
          alignItems: 'center',
          flexDirection: 'row',
      
       },
       check_icon:{
        width: 20,
        height: 20,
       },
       check_text: {
         color: '#FFFFFF',
        textTransform: 'uppercase',
        marginLeft: 5,
        marginRight: 10,
        fontSize: 13,
      },
      org_background:{
        backgroundColor:Colors.n_org
      },
      blue_background:{
        backgroundColor:Colors.n_blue
      },  
    title: {
      fontSize: 20,
      fontStyle:'normal',
      width:'100%',
      color: 'black',
      marginTop:'20px',
      alignItems:'center',
       marginBottom:'20px',
       textAlign: 'center',
    },
    outerbox: {
        width: 100, // Adjust width as needed
        height: 100, // Adjust height as needed
        borderWidth: 1,
        borderColor: Colors.n_outer, // Replace with your color value
        borderRadius: 6,
        backgroundColor: '#ffffff', // Replace with your color value
      },
    inputicon: {
        width: 25,
        height: 25,
        marginLeft: 5,
       },
      inputedit: {
        marginLeft: 10,
        padding: 15,
         fontSize: 13,
         color: '#000000', // Black color
        flex: 1, // Takes the remaining space in the row
      },
      inputcontainer: {
        width:'100%',
        height:'20%',
        backgroundColor:'red',
        flexDirection: 'row',
         marginTop: 30,
        marginLeft: 30,
        marginRight: 30,
        padding: 5, // Adjust if needed
      },
      outer_padding_box: {
        margin:15,
        width:'90%',
        alignItems:'center',
        alignSelf:'center',
        borderWidth: 1,
        borderColor: Colors.white, // Replace with your color
        backgroundColor: Colors.white, // Solid color (white)
        borderRadius: 6, // Rounded corners
        padding: 16, // Optional: Add padding
       },
  });
  export default styles;
  