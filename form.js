import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import colors from './colors';
// import RNHTMLtoPDF from 'react-native-html-to-pdf';
import * as Print from 'expo-print'
import * as FileSystem from 'expo-file-system';

export default function FormPopup({ isVisible, onClose }) {

  const [destination, setDestination] = useState('');
  const [budget, setBudget] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [subDestinations, setSubDestinations] = useState(['']);
  const [flights, setFlights] = useState([]);
  const [accommodations, setAccommodations] = useState(['']);
  const [activities, setActivities] = useState(['']);
  const [transportation, setTransportation] = useState(['']);

  const addSubDestination = () => {
    setSubDestinations([...subDestinations, '']);
  };

  const addFlight = () => {
    setFlights([...flights, '']);
  };

  const addAccommodation = () => {
    setAccommodations([...accommodations, '']);
  };
  
  const addActivity = () => {
    setActivities([...activities, '']);
  };
  
  const addTransportation = () => {
    setTransportation([...transportation, '']);
  }

  const removeSubDestination = (index) => {
    const newSubDestinations = [...subDestinations];
    newSubDestinations.splice(index, 1);
    setSubDestinations(newSubDestinations);
  };

  const removeFlight = (index) => {
    const newFlights = [...flights];
    newFlights.splice(index, 1);
    setFlights(newFlights);
  };

  const removeAccommodation = (index) => {
    const newAccommodations = [...accommodations];
    newAccommodations.splice(index, 1);
    setAccommodations(newAccommodations);
  };
  
  const removeActivity = (index) => {
    const newActivities = [...activities];
    newActivities.splice(index, 1);
    setActivities(newActivities);
  };

  const removeTransportation = (index) => {
    const newTransportation = [...transportation];
    newTransportation.splice(index, 1);
    setTransportation(newTransportation);
  };

  const handleSubDestinationChange = (text, index) => {
    const updatedSubDestinations = [...subDestinations];
    updatedSubDestinations[index] = text;
    setSubDestinations(updatedSubDestinations);
  };

  const handleFlightChange = (text, index) => {
    const updatedFlights = [...flights];
    updatedFlights[index] = text;
    setFlights(updatedFlights);
  };

  const handleAccommodationChange = (text, index) => {
    const updatedAccommodations = [...accommodations];
    updatedAccommodations[index] = text;
    setAccommodations(updatedAccommodations);
  };
  
  const handleActivityChange = (text, index) => {
    const updatedActivities = [...activities];
    updatedActivities[index] = text;
    setActivities(updatedActivities);
  };
  
  const handleTransportationChange = (text, index) => {
    const updatedTransportation = [...transportation];
    updatedTransportation[index] = text;
    setTransportation(updatedTransportation);
  };

  const handleSubmit = async () => {
    if (!destination.trim() || !startDate || !endDate) {
      alert('Please enter a destination and/or dates');
      return;
    }

    let htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Itinerary</title>
        <style>

        </style>
      </head>
      <body>
        <h1>Hello, UppLabs!</h1>
        <p><strong>Destination:</strong> ${destination}</p>
        <p><strong>Start Date:</strong> ${startDate.toLocaleDateString()}</p>
        <p><strong>End Date:</strong> ${endDate.toLocaleDateString()}</p>
        <p><strong>Budget:</strong> ${budget}</p>
        <h2>Sub-Destinations</h2>
          <ul>
          `;
          subDestinations.forEach((subDestination) => {
            htmlContent += `<li>${subDestination}</li>`;
          });
      
          htmlContent += `
                </ul>
                <h2>Flights</h2>
                <ul>
          `;
          flights.forEach((flight) => {
            htmlContent += `<li>${flight}</li>`;
          });
          
          htmlContent += `
                </ul>
                <h2>Accommodations:</h2>
                <ul>
          `;
          
          accommodations.forEach((accommodation) => {
            htmlContent += `<li>${accommodation}</li>`;
          });
        
          htmlContent += `
                </ul>
                <h2>Activities:</h2>
                <ul>
          `;
          
          activities.forEach((activity) => {
            htmlContent += `<li>${activity}</li>`;
          });
          
          htmlContent += `
                </ul>
                <h2>Transportation:</h2>
                <ul>
          `;
          
          transportation.forEach((transport) => {
            htmlContent += `<li>${transport}</li>`;
          });

        `
      </body>
    </html>
  `;

  try {
    const { uri } = await Print.printToFileAsync({ html: htmlContent });
    // Use Expo Filesystem or Expo Sharing to handle the file as needed
    const fileUri = FileSystem.documentDirectory + 'itinerary_' + destination + '.pdf';
    await FileSystem.moveAsync({ 
      from: uri, 
      to:fileUri 
    });
    alert('PDF created successfully: ' + uri);
  } catch (error) {
    alert('Error creating PDF: ' + error);
  }
};


  return (
    <Modal visible={isVisible} animationType="slide">
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Itinerary Form</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Dates:</Text>
          <View style={styles.datePickerContainer}>
            <DateTimePicker
              style={styles.datePicker}
              value={startDate}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={(event, selectedDate) => {
                const currentDate = selectedDate || startDate;
                setStartDate(currentDate);
              }}
            />
            <DateTimePicker
              style={styles.datePicker}
              value={endDate}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={(event, selectedDate) => {
                const currentDate = selectedDate || endDate;
                setEndDate(currentDate);
              }}
            />
          </View>
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Destination:</Text>
          <TextInput 
            style={styles.input} 
            placeholder='Enter destination' 
            value={destination} 
            onChangeText={setDestination}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Budget:</Text>
          <TextInput 
            style={styles.input} 
            placeholder='Enter Budget' 
            value={budget} 
            onChangeText={setBudget}
          />
        </View>



        {subDestinations.map((subDestination, index) => (
          <View key={index} style={styles.inputContainer}>
            <Text style={styles.label}>Sub Destination {index + 1}:</Text>
            <TextInput 
              style={styles.input} 
              placeholder='Enter sub destination' 
              value={subDestination} 
              onChangeText={(text) => handleSubDestinationChange(text, index)}
            />
            <TouchableOpacity style={styles.removeButton} onPress={() => removeSubDestination(index)}>
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity style={styles.addButton} onPress={addSubDestination}>
          <Text style={styles.addButtonText}>Add Sub Destination</Text>
        </TouchableOpacity>

        {flights.map((flight, index) => (
          <View key={index} style={styles.inputContainer}>
            <Text style={styles.label}>Flight {index + 1}:</Text>
            <TextInput 
              style={styles.input} 
              placeholder='Enter Flight Info' 
              value={flight} 
              onChangeText={(text) => handleFlightChange(text, index)}
            />
            <View style={styles.datePickerContainer}>
              <DateTimePicker
                style={styles.datePicker}
                value={startDate}
                mode="datetime"
                is24Hour={true}
                display="default"
                onChange={(event, selectedDate) => {
                  const currentDate = selectedDate || startDate;
                  setStartDate(currentDate);
                }}
              />
              <DateTimePicker
                style={styles.datePicker}
                value={endDate}
                mode="datetime"
                is24Hour={true}
                display="default"
                onChange={(event, selectedDate) => {
                  const currentDate = selectedDate || endDate;
                  setEndDate(currentDate);
                }}
              />
            </View>
            <TouchableOpacity style={styles.removeButton} onPress={() => removeFlight(index)}>
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity style={styles.addButton} onPress={addFlight}>
          <Text style={styles.addButtonText}>Add Flight</Text>
        </TouchableOpacity>

        {accommodations.map((accommodation, index) => (
          <View key={index} style={styles.inputContainer}>
            <Text style={styles.label}>Accommodation {index + 1}:</Text>
            <TextInput 
              style={styles.input} 
              placeholder='Enter location of your accommodation' 
              value={accommodation} 
              onChangeText={(text) => handleAccommodationChange(text, index)}
            />
            <TouchableOpacity style={styles.removeButton} onPress={() => removeAccommodation(index)}>
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity style={styles.addButton} onPress={addAccommodation}>
          <Text style={styles.addButtonText}>Add Accommodation</Text>
        </TouchableOpacity>
      
        {activities.map((activity, index) => (
          <View key={index} style={styles.inputContainer}>
            <Text style={styles.label}>Activity {index + 1}:</Text>
            <TextInput 
              style={styles.input} 
              placeholder='Enter an activity' 
              value={activity} 
              onChangeText={(text) => handleActivityChange(text, index)}
            />
            <TouchableOpacity style={styles.removeButton} onPress={() => removeActivity(index)}>
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity style={styles.addButton} onPress={addActivity}>
          <Text style={styles.addButtonText}>Add Activity</Text>
        </TouchableOpacity>
      
        {transportation.map((transportation, index) => (
          <View key={index} style={styles.inputContainer}>
            <Text style={styles.label}>Transportation {index + 1}:</Text>
            <TextInput 
              style={styles.input} 
              placeholder='Enter a transportation' 
              value={transportation} 
              onChangeText={(text) => handleTransportationChange(text, index)}
            />
            <TouchableOpacity style={styles.removeButton} onPress={() => removeTransportation(index)}>
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity style={styles.addButton} onPress={addTransportation}>
          <Text style={styles.addButtonText}>Add Transportation</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 40,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 10,
  },
  datePickerContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  datePicker: {
    flex: 1,
    marginRight: 25,
  },
  addButton: {
    backgroundColor: colors.lightPink,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  addButtonText: {
    color: colors.darkGrey,
    fontWeight: 'bold',
    fontSize: 16,
  },
  removeButton: {
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
    fontWeight: 'bold',
  },
  removeButtonText: {
    color: colors.darkPink,
    fontWeight: 'bold',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: colors.darkPink,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: colors.lightGrey,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  closeButtonText: {
    color: colors.darkGrey,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
