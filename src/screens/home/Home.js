import React, { useState } from 'react';
import { Image, View, Text, SafeAreaView, StyleSheet } from "react-native";
import CardButton from "./components/CardButton";

import logo from "../../../assets/logo.png";
import user from '../../../assets/user.png';
import cart from '../../../assets/cart.png';
import mail from '../../../assets/mail.png';
import truck from '../../../assets/truck.png';
import badge from '../../../assets/badge.png';
import box from '../../../assets/box.png';
import expense from '../../../assets/expense.png';



const Home = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} resizeMode="contain" source={logo} />
      <View pointerEvents={loading ? 'none' : 'auto'} style={styles.grid}>
        <CardButton
          title="Encomendas"
          icon={cart}
          onPress={() =>
            navigation.navigate("Encomendas")}
        />
        <CardButton
          title="Requisições"
          icon={mail}
          onPress={() =>
            navigation.navigate("Requisições")}
        />
        <CardButton
          title="Clientes"
          icon={user}
          onPress={() =>
            navigation.navigate("Clientes")}
        />
        <CardButton
          title="Produtos"
          icon={box}
          onPress={() =>
            navigation.navigate("Produtos")}
        />
        <CardButton
          title="Fornecedores"
          icon={truck}
          onPress={() =>
            navigation.navigate("Fornecedores")}
        />
        <CardButton
          title="Funcionários"
          icon={badge}
          onPress={() =>
            navigation.navigate("Fornecedores")}
        />
        <CardButton
          title="Despesas"
          icon={expense}
          onPress={() =>
            navigation.navigate("Fornecedores")}
        />
      </View>
    </SafeAreaView>
  );

};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 5,
    alignSelf: 'center',
  },
  boasVindas: {
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf: 'center',
  },
  grid: {
    flex: 1,
    flexWrap: 'wrap',
    alignItems: 'flex-end',
    alignContent: 'flex-end',
    flexDirection: 'row',
    paddingVertical: 40,
    paddingHorizontal: 10,
    marginTop: '20%',
    justifyContent: 'space-evenly',
  },
})