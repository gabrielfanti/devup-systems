import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export function ClientDetail({item, setClienteSelecionado}) {
  
  return (
    <TouchableOpacity style={styles.cartao} onPress={() => setClienteSelecionado(item)}>
      <Text style={styles.texto}>Nome: {item.nome}</Text>
      <Text style={styles.texto}>CPF: {item.cpf}</Text>
      <Text style={styles.texto}>Contato: {item.contato}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  cartao: {
    borderRadius: 8,
    backgroundColor: "#ffffff",
    paddingVertical: 8,
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
    elevation: 4,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },
  texto: {
    lineHeight: 28,
  }
})