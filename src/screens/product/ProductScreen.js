import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { criaTabela, buscaProduto } from "../../database/services/productAPI";
import ProductEdit from "./ProductEdit";

export default function ProductScreen() {

  useEffect(() => {
    criaTabela();
    mostraProdutos();
  }, []);

  const [produtos, setProdutos] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState({});
  const [termoPesquisa, setTermoPesquisa] = useState('');

  async function mostraProdutos() {
    const todosProdutos = await buscaProduto();
    todosProdutos.sort((a, b) => a.nome.localeCompare(b.nome));
    setProdutos(todosProdutos);
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

  function filtrarProdutos() {
    return produtos.filter(produto => produto.nome.toLowerCase().includes(termoPesquisa.toLowerCase()));
  }

  return (
    <SafeAreaView style={estilos.container}>
      <View style={estilos.barraPesquisa}>
        <TextInput
          style={estilos.caixaTexto}
          onChangeText={setTermoPesquisa}
          placeholder="Buscar produto"
          value={termoPesquisa}
        />
      </View>
      <FlatList
        data={filtrarProdutos()}
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
  barraPesquisa: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#5050ff',
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    paddingHorizontal: 5,
  },
  caixaTexto: {
    flex: 1,
    fontSize: 18,
    height: 40,
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