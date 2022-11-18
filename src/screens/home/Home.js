import React, { useState } from 'react';
import { Image, View, Text, SafeAreaView, StyleSheet } from "react-native";
import CardButton from "./components/CardButton";
import HeaderMenu from "./components/HeaderMenu";

import logo from "../../../assets/logo.png";
import sale from '../../../assets/sale.png';
import user from '../../../assets/user.png';
import cart from '../../../assets/cart.png';
import price from '../../../assets/price.png'


const Home = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderMenu />
      <Image style={styles.logo} resizeMode="contain" source={logo} />
      <View pointerEvents={loading ? 'none' : 'auto'} style={styles.grid}>
        <CardButton
          title="Venda"
          icon={cart}
        />
        <CardButton
          title="Consulta venda"
          icon={sale}
        />
        <CardButton disabled={true}
          title="Consulta preços"
          icon={price}
        />
        <CardButton
          title="Clientes"
          icon={user}
          onPress={() =>
            navigation.navigate("Clientes")}
        />
        <CardButton
          title="Produtos"
          icon={user}
        />
        <CardButton
          title="Fornecedores"
          icon={user}
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