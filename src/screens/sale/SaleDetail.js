import React from "react";
import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';

export function SaleDetail({ item }) {
  const navigation = useNavigation(); 

  return (
    <SafeAreaView>
      <TouchableOpacity style={styles.cartao} onPress={() => navigation.navigate("Recebimento")}>
        <Text style={styles.texto}>{item.marca} - {item.nome}</Text>
        <Text style={styles.valor}>Valor: R$ <Text style={styles.valorBold}>{item.valor}</Text></Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  cartao: {
    borderColor: "#5050ff",
    borderRadius: 4,
    backgroundColor: "#ffffff",
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginBottom: 0,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 2,
  },
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
    fontWeight: "800"
  },
  botaoReceber: {
    display: "flex",
    zIndex: -1,
    padding: 12,
    alignItems: "center",
    backgroundColor: '#999999',
  },
})