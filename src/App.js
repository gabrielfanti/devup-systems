import React from 'react';
import { StatusBar, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './screens/login/Login';
import NewUser from './screens/user/newUser';
import Home from "./screens/home/Home";
import ClientRegister from './screens/client/register/clientRegister';
import ClientReport from './screens/client/report/clientReport'
import ProductRegister from './screens/product/register/productRegister';
import ProductReport from './screens/product/report/productReport';
import SupplierRegister from './screens/supplier/register/SupplierRegister';
import SupplierReport from './screens/supplier/report/SupplierReport';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false}}/>
      <Stack.Screen name="NewUser" component={NewUser} options={{ headerShown: false}}/>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false}}/>
      <Stack.Screen name="ClientRegister" component={ClientRegister} options={{ headerShown: false}}/>
      <Stack.Screen name="ClientReport" component={ClientReport} options={{ headerShown: false}}/>
      <Stack.Screen name="ProductRegister" component={ProductRegister} options={{ headerShown: false}}/>
      <Stack.Screen name="ProductReport" component={ProductReport} options={{ headerShown: false}}/>
      <Stack.Screen name="SupplierRegister" component={SupplierRegister} options={{ headerShown: false}}/>
      <Stack.Screen name="SupplierReport" component={SupplierReport} options={{ headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
