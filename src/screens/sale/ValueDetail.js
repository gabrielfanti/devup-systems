import React from "react";
import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';

export function ValueDetail({ item }) {
  const navigation = useNavigation(); 

  return (
    <SafeAreaView>
      <View style={styles.cartao} onPress={() => navigation.navigate("Recebimento")}>
        <Text style={styles.valor}>R$ <Text style={styles.valorBold}>{item.valor}</Text></Text>
      </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  texto: {
    lineHeight: 28,
  },
  valor: {
    position: "relative",
    textAlign: "right",
    lineHeight: 15,
  },
  valorBold: {
    fontSize: 16,
    fontColor: "#f0f0f0",
  },
  botaoReceber: {
    display: "flex",
    zIndex: -1,
    padding: 12,
    alignItems: "center",
    backgroundColor: '#999999',
  },
})