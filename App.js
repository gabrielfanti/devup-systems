import React from 'react';
import { StatusBar, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './src/screens/login/Login';
import NewUser from './src/screens/user/newUser';
import Home from "./src/screens/home/Home";
import ClientScreen from './src/screens/client/ClientScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="NewUser" component={NewUser} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Clientes" component={ClientScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
