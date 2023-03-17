import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";
import { criaTabela, buscaEncomenda } from "../../database/services/orderAPI";
import OrderEdit from "./OrderEdit";

export default function OrderScreen() {

  useEffect(() => {
    criaTabela();
    mostraEncomendas();
  }, []);

  const [encomendas, setEncomendas] = useState([]);
  const [encomendaSelecionada, setEncomendaSelecionada] = useState({});

  async function mostraEncomendas() {
    const todasEncomendas = await buscaEncomenda();
    setEncomendas(todasEncomendas);
  }

  function getStatusColor(status) {
    if (status === "ATIVADO") {
      return { backgroundColor: '#3CB35A' };
    } else {
      return { backgroundColor: '#808080' };
    }
  }

  function compareEncomendas(a, b) {
    if (a.status === "ATIVADO" && b.status !== "ATIVADO") {
      return -1;
    }
    if (a.status !== "ATIVADO" && b.status === "ATIVADO") {
      return 1;
    }
    return 0;
  }

  function OrderDetail({ item }) {
    const cardStyle = getStatusColor(item.status);

    return (
      <TouchableOpacity style={[estilos.cartao, cardStyle]} onPress={() => setEncomendaSelecionada(item)}>
        <Text style={estilos.texto}>Cliente: {item.cliente}</Text>
        <Text style={estilos.texto}>Produto: {item.produto}</Text>
        <Text style={estilos.texto}>Status: {item.status}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={estilos.container}>
      <FlatList
        data={encomendas.sort(compareEncomendas)}
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
    borderRadius: 4,
    backgroundColor: "#ffffff",
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginBottom: 8,
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