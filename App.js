// App.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import colors from './colors';
import FormPopup from './form';

export default function App() {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Travel Planner</Text>
      <TouchableOpacity style={styles.button} onPress={toggleForm}>
        <Text style={styles.buttonText}>Create Itinerary</Text>
      </TouchableOpacity>
      <FormPopup isVisible={isFormVisible} onClose={toggleForm} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkPink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    margin: 30,
  },
  button: {
    backgroundColor: colors.lightPink,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: colors.darkGrey,
    fontWeight: 'bold',
    fontSize: 16,
  }
});
