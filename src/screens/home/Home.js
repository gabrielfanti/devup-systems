import React, { useState } from 'react';
import { Image, View, SafeAreaView, StyleSheet } from "react-native";
import { widthToDP as wp, heightToDP as hp } from "react-native-responsive-screens";
import CardButton from "./components/CardButton";
import HeaderMenu from "./components/HeaderMenu";

import logo from "../../assets/logo.png";
import sale from '../../assets/sale.png';
import user from '../../assets/user.png';
import cart from '../../assets/cart.png';
import price from '../../assets/price.png';

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
          title="Cliente"
          icon={user}
        />
        <CardButton
          title="Consulta venda"
          icon={sale}
        />
        <CardButton
          title="Consulta produto"
          icon={price}
        />
        <CardButton
          title="Consulta produto"
          icon={price}
        />
        <CardButton
          title="Consulta produto"
          icon={price}
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
  grid: {
    flex: 1,
    flexWrap: 'wrap',
    alignItems: 'flex-end',
    alignContent: 'flex-end',
    flexDirection: 'row',
    paddingVertical: 54,
    paddingHorizontal: 10,
    marginTop: hp("60"),
    justifyContent: 'space-evenly',
  },
})