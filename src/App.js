import React from 'react';
import { StatusBar, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './screens/login/Login';
import Register from './screens/register/Register';
import Home from "./screens/home/Home";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false}}/>
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false}}/>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
