import React, { useState } from 'react';
import { Image, View, Text, SafeAreaView, StyleSheet } from "react-native";
import { widthToDP as wp, heightToDP as hp } from "react-native-responsive-screens";
import CardButton from "./components/CardButton";
import HeaderMenu from "./components/HeaderMenu";

import logo from "../../assets/logo.png";
import sale from '../../assets/sale.png';
import user from '../../assets/user.png';
import cart from '../../assets/cart.png';


const Home = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderMenu />
      <Image style={styles.logo} resizeMode="contain" source={logo} />
      <Text style={styles.boasVindas}>Bem vindo ao DevUp Systems PDV!</Text>
      <View pointerEvents={loading ? 'none' : 'auto'} style={styles.grid}>
        <CardButton
          title="Venda"
          icon={cart}
        />
        <CardButton
          title="Cadastrar"
          icon={user}
        />
        <CardButton
          title="Consulta"
          icon={sale}
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