import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export function ProductDetail({ item, setProdutoSelecionado }) {

  return (
    <TouchableOpacity style={styles.cartao} onPress={() => setProdutoSelecionado(item)}>
      <Text style={styles.texto}>Nome: {item.nome}</Text>
      <Text style={styles.texto}>Marca: {item.marca}</Text>
      <Text style={styles.texto}>Valor: {item.valor}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  cartao: {
    borderColor: "#5050ff",
    borderRadius: 4,
    backgroundColor: "#ffffff",
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginBottom: 8,
    borderTopWidth: 5,
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
  }
})