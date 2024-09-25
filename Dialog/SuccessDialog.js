// CustomDialog.js
import React ,{useState,useEffect} from 'react';
import { Modal, View, Text, Button, StyleSheet, TouchableOpacity ,Animated } from 'react-native';
import styles from './DialogStyles';

const SuccessDialog = ({ visible, message }) => {
      const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity
      useEffect(() => {

       

        if (visible) {
          // Fade in
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }).start();
        } else {
          // Fade out
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start();
        }
      }, [visible]);
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
    >
      <View style={styles.overlay}>
        <Animated.View style={[styles.dialogContainer, { opacity: fadeAnim }]}>
           <Text style={styles.message}>{message}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}  >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
           
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

 
export default SuccessDialog;
