import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";
import { criaTabela, buscaCliente } from "../../database/services/clientAPI";
import ClientEdit from "./ClientEdit";

export default function ClientScreen() {

  useEffect(() => {
    criaTabela();
    mostraClientes();
  }, []);

  const [clientes, setClientes] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState({});

  async function mostraClientes() {
    const todosClientes = await buscaCliente();
    setClientes(todosClientes);
    console.log(todosClientes);
  }

  function ClientDetail({ item }) {
    return (
      <TouchableOpacity style={estilos.cartao} onPress={() => setClienteSelecionado(item)}>
        <Text style={estilos.texto}>Nome: {item.nome}</Text>
        <Text style={estilos.texto}>CPF: {item.cpf}</Text>
        <Text style={estilos.texto}>Contato: {item.contato}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={estilos.container}>
      <FlatList
        data={clientes}
        renderItem={({ item }) => <ClientDetail item={item} />}
        keyExtractor={(item) => item.id}
      />
      <ClientEdit mostraClientes={mostraClientes} clienteSelecionado={clienteSelecionado} setClienteSelecionado={setClienteSelecionado} />
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