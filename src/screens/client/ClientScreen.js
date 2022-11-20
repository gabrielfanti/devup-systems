import { FlatList, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { ClientDetail } from "./ClientDetail";
import ClientEdit from "./ClientEdit";
import { useEffect, useState } from "react";
import { criaTabela, buscaCliente } from "../../database/services/clientAPI";

export default function ClientScreen() {

  useEffect(() => {
    criaTabela()
    mostraClientes()
  }, [])

  const [clientes, setClientes] = useState([])
  const [clienteSelecionado, setClienteSelecionado] = useState({})

  async function mostraClientes() {
    const todosClientes = await buscaCliente()
    setClientes(todosClientes)
    console.log(todosClientes)
  }

  return (
    <SafeAreaView style={estilos.container}>
      <FlatList
        data={clientes}
        renderItem={(cliente) => <ClientDetail {...cliente} setClienteSelecionado={setClienteSelecionado} />}
        keyExtractor={cliente => cliente.id} />
      <ClientEdit mostraClientes={mostraClientes} clienteSelecionado={clienteSelecionado} setClienteSelecionado={setClienteSelecionado} />
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