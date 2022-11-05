import React, { useState } from 'react';
import { Image, View, Text, SafeAreaView, StyleSheet } from "react-native";
import { widthToDP as wp, heightToDP as hp } from "react-native-responsive-screens";
import CardButton from "./components/CardButton";
import HeaderMenu from "./components/HeaderMenu";

import logo from "../../assets/logo.png";
import sale from '../../assets/sale.png';
import user from '../../assets/user.png';
import cart from '../../assets/cart.png';
import price from '../../assets/price.png'


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
          icon={cart}
        />
        <CardButton
          title="Consulta preços"
          icon={cart}
        />
        <CardButton
          title="Cadastrar clientes"
          icon={user}
          onPress={() =>
            navigation.navigate("ClientRegister")}
        />
        <CardButton
          title="Cadastrar produtos"
          icon={user}
          onPress={() =>
            navigation.navigate("ProductRegister")}
        />
        <CardButton
          title="cadastro de fornecedores"
          icon={user}
          onPress={() =>
            navigation.navigate("SupplierRegister")}
        />
        <CardButton
          title="Relatório clientes"
          icon={sale}
          onPress={() =>
            navigation.navigate("ClientReport")}
        />
        <CardButton
          title="Relatório produtos"
          icon={sale}
          onPress={() =>
            navigation.navigate("ProductReport")}
        />
        <CardButton
          title="Relatório de fornecedores"
          icon={sale}
          onPress={() =>
            navigation.navigate("SupplierReport")}
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
    width: wp("45%"),
    height: hp("20%"),
    marginTop: hp("1%"),
    alignSelf: 'center',
  },
  boasVindas: {
    fontWeight: 'bold',
    fontSize: wp("4.00%"),
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
    marginTop: hp("20%"),
    justifyContent: 'space-evenly',
  },
})