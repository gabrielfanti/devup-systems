import { Text, View, FlatList, SafeAreaView, StatusBar, TouchableOpacity, StyleSheet } from "react-native";
import { SaleDetail } from "./SaleDetail";
import { useEffect, useState } from "react";
import { criaTabela, buscaProduto } from "../../database/services/productAPI";

export default function SaleScreen() {

  useEffect(() => {
    criaTabela()
    mostraProdutos()
  }, [])

  const [produtos, setProdutos] = useState([])
  const [produtoSelecionado, setProdutoSelecionado] = useState({})

  async function mostraProdutos() {
    const todosProdutos = await buscaProduto()
    setProdutos(todosProdutos)
    console.log(todosProdutos)
  }

  return (
    <SafeAreaView style={estilos.container}>
      <TouchableOpacity style={estilos.botaoCliente}>
        <Text style={estilos.botaoClienteTexto}>Cliente Geral</Text>
      </TouchableOpacity>
      <View>
        <Text style={estilos.cartaoTexto}>Selecione um produto:</Text>
      </View>
      <FlatList
        data={produtos}
        renderItem={(produto) => <SaleDetail {...produto} setProdutoSelecionado={setProdutoSelecionado} />}
        keyExtractor={produto => produto.id} />
      <StatusBar />
    </SafeAreaView>
  )
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
  botaoCliente: {
    padding: 12,
    borderWidth: 1,
    alignItems: "center",
    backgroundColor: '#999999',
  },
  botaoClienteTexto: {
    fontSize: 20,
  },
  cartaoTexto: {
    fontSize: 22,
    textAlign: "center",
    paddingTop: 12,
    paddingBottom: 50
  },
})