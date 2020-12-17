import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Game from './components/Game'
import { StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import start from './components/start';

  const Stack = createStackNavigator();


export default function App() {

  return (
    <NavigationContainer documentTitle="True or False">
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen
          name="Start"
          component={start}
          options={{
            title: "True or false",
            headerStyle: {
              backgroundColor: "#284f41",
            },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="Game"
          component={Game}
          options={{
            title: "True or false",
            headerStyle: {
              backgroundColor: "#284f41",
            },
            headerTintColor: "#fff",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
