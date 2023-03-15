import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";
import { criaTabela, buscaEncomenda } from "../../database/services/orderAPI";
import OrderEdit from "./OrderEdit";

export default function OrderScreen() {

  useEffect(() => {
    criaTabela();
    mostraEncomendas();
  }, []);

  const [fornecedores, setEncomendas] = useState([]);
  const [encomendaSelecionada, setEncomendaSelecionada] = useState({});

  async function mostraEncomendas() {
    const todasEncomendas = await buscaEncomenda();
    setEncomendas(todasEncomendas);
    console.log(todasEncomendas);
  }

  function OrderDetail({ item }) {
    return (
      <TouchableOpacity style={estilos.cartao} onPress={() => setEncomendaSelecionada(item)}>
        <Text style={estilos.texto}>Cliente: {item.cliente}</Text>
        <Text style={estilos.texto}>Produto: {item.produto}</Text>
        <Text style={estilos.texto}>Status: {item.status}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={estilos.container}>
      <FlatList
        data={fornecedores}
        renderItem={({ item }) => <OrderDetail item={item} />}
        keyExtractor={(item) => item.id}
      />
      <OrderEdit mostraEncomendas={mostraEncomendas} encomendaSelecionada={encomendaSelecionada} setEncomendaSelecionada={setEncomendaSelecionada} />
      <StatusBar />
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
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
  },
});