import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";
import { criaTabela, buscaProduto } from "../../database/services/productAPI";
import ProductEdit from "./ProductEdit";

export default function ProductScreen() {

  useEffect(() => {
    criaTabela();
    mostraProdutos();
  }, []);

  const [produtos, setProdutos] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState({});

  async function mostraProdutos() {
    const todosProdutos = await buscaProduto();
    setProdutos(todosProdutos);
    console.log(todosProdutos);
  }

  function ProductDetail({ item }) {
    return (
      <TouchableOpacity style={estilos.cartao} onPress={() => setProdutoSelecionado(item)}>
        <Text style={estilos.texto}>Nome: {item.nome}</Text>
        <Text style={estilos.texto}>Marca: {item.marca}</Text>
        <Text style={estilos.texto}>Valor: {item.valor}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={estilos.container}>
      <FlatList
        data={produtos}
        renderItem={({ item }) => <ProductDetail item={item} />}
        keyExtractor={(item) => item.id}
      />
      <ProductEdit mostraProdutos={mostraProdutos} produtoSelecionado={produtoSelecionado} setProdutoSelecionado={setProdutoSelecionado} />
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