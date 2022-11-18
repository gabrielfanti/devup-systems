import React from 'react';
import { Text, Image, StyleSheet, Dimensions } from 'react-native';
import TouchableScale from 'react-native-touchable-scale';

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
    width: '30%',
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonEnabled: {
    backgroundColor: "#5050ff",
  },
  buttonDisabled: {
    backgroundColor: '#999999',
  },
  text: {
    fontSize: 12,
    color: '#ffffff',
  },
  icon: {
    width: 32,
    height: 32,
  },
});