import React from 'react';
import { Text, Image, StyleSheet, Dimensions } from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import { widthToDP as wp, heightToDP as hp } from "react-native-responsive-screens";

const CardButton = ({ title, icon, onPress, disabled }) => {
  return (
    <TouchableScale onPress={onPress} style={[styles.container, disabled ? styles.buttonDisabled : styles.buttonEnabled]}>
      <Text style={styles.text}>{title}</Text>
      <Image resizeMode="contain" style={styles.icon} source={icon} />
    </TouchableScale>
  );
};

export default CardButton;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    elevation: 8,
    aspectRatio: 1,
    width: wp("28%"),
    borderRadius: 8,
    marginBottom: 80,
  },
  buttonEnabled: {
    backgroundColor: '#00297f',
  },
  buttonDisabled: {
    backgroundColor: '#86cddf',
  },
  icon: {
    width: wp(7.75),
    height: hp(7.75),
  },
  text: {
    fontSize: wp("3%"),
    color: '#ffffff',
  },
});