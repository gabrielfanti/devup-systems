import { FlatList, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { ProductDetail } from "./ProductDetail";
import ProductEdit from "./ProductEdit";
import { useEffect, useState } from "react";
import { criaTabela, buscaProduto } from "../../database/services/productAPI";

export default function ProductScreen() {

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
      <FlatList
        data={produtos}
        renderItem={(produto) => <ProductDetail {...produto} setProdutoSelecionado={setProdutoSelecionado} />}
        keyExtractor={produto => produto.id} />
      <ProductEdit mostraProdutos={mostraProdutos} produtoSelecionado={produtoSelecionado} setProdutoSelecionado={setProdutoSelecionado} />
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
})