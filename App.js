import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Game from './components/Game'
import Header from "./components/Header";
import { Button, StyleSheet, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import start from './components/start';
import { render } from 'react-dom';

  const Stack = createStackNavigator();


export default function App() {

    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Start">
          <Stack.Screen name="Start" component={start} />
          <Stack.Screen name="Game" component={Game} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
