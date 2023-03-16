import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { criaTabela, buscaCliente } from "../../database/services/clientAPI";
import ClientEdit from "./ClientEdit";

export default function ClientScreen() {

  useEffect(() => {
    criaTabela();
    mostraClientes();
  }, []);

  const [clientes, setClientes] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState({});
  const [termoPesquisa, setTermoPesquisa] = useState('');

  async function mostraClientes() {
    const todosClientes = await buscaCliente();
    todosClientes.sort((a, b) => a.nome.localeCompare(b.nome));
    setClientes(todosClientes);
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

  function filtrarClientes() {
    return clientes.filter(cliente => cliente.nome.toLowerCase().includes(termoPesquisa.toLowerCase()));
  }

  return (
    <SafeAreaView style={estilos.container}>
      <View style={estilos.barraPesquisa}>
        <TextInput
          style={estilos.caixaTexto}
          onChangeText={setTermoPesquisa}
          placeholder="Buscar cliente"
          value={termoPesquisa}
        />
      </View>
      <FlatList
        data={filtrarClientes()}
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
