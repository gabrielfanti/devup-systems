import React from 'react';
import { StatusBar, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './src/screens/login/Login';
import NewUser from './src/screens/user/newUser';
import Home from "./src/screens/home/Home";
import SaleScreen from './src/screens/sale/SaleScreen';
import ReceivementScreen from './src/screens/sale/ReceivementScreen';
import ClientScreen from './src/screens/client/ClientScreen';
import ProductScreen from './src/screens/product/ProductScreen';
import SupplierScreen from './src/screens/supplier/SupplierScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="NewUser" component={NewUser} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Venda" component={SaleScreen} />
        <Stack.Screen name="Recebimento" component={ReceivementScreen} />
        <Stack.Screen name="Clientes" component={ClientScreen} />
        <Stack.Screen name="Produtos" component={ProductScreen} />
        <Stack.Screen name="Fornecedores" component={SupplierScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
