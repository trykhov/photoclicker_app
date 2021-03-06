import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'
import Home from './screens/Home';
import CameraScreen from './screens/CameraScreen';

// always install react-native-gesture-handler when install react-navigation

const MainNavigator = createStackNavigator(
  {
    Home: { screen: Home },
    Camera: { screen: CameraScreen }
  },
  {
    defaultNavigationOptions: {
      headerTintColor: "#FFF",
      headerStyle: {
        backgroundColor: "#B83227"
      },
      headerTitleStyle: {
        color: "#FFF"
      }
    }
  }
);

const App = createAppContainer(MainNavigator);
export default App;


