import { FlatList, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { SupplierDetail } from "./SupplierDetail";
import SupplierEdit from "./SupplierEdit";
import { useEffect, useState } from "react";
import { criaTabela, buscaFornecedor } from "../../database/services/supplierAPI";

export default function SupplierScreen() {

  useEffect(() => {
    criaTabela()
    mostraFornecedores()
  }, [])

  const [fornecedores, setFornecedores] = useState([])
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState({})

  async function mostraFornecedores() {
    const todosFornecedores = await buscaFornecedor()
    setFornecedores(todosFornecedores)
    console.log(todosFornecedores)
  }

  return (
    <SafeAreaView style={estilos.container}>
      <FlatList
        data={fornecedores}
        renderItem={(fornecedor) => <SupplierDetail {...fornecedor} setFornecedorSelecionado={setFornecedorSelecionado} />}
        keyExtractor={fornecedor => fornecedor.id} />
      <SupplierEdit mostraFornecedores={mostraFornecedores} fornecedorSelecionado={fornecedorSelecionado} setFornecedorSelecionado={setFornecedorSelecionado} />
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