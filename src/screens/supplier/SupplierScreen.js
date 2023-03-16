import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";
import { criaTabela, buscaFornecedor } from "../../database/services/supplierAPI";
import SupplierEdit from "./SupplierEdit";

export default function SupplierScreen() {

  useEffect(() => {
    criaTabela();
    mostraFornecedores();
  }, []);

  const [fornecedores, setFornecedores] = useState([]);
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState({});

  async function mostraFornecedores() {
    const todosFornecedores = await buscaFornecedor();
    setFornecedores(todosFornecedores);
  }

  function SupplierDetail({ item }) {
    return (
      <TouchableOpacity style={estilos.cartao} onPress={() => setFornecedorSelecionado(item)}>
        <Text style={estilos.texto}>Nome: {item.nome}</Text>
        <Text style={estilos.texto}>CNPJ: {item.cnpj}</Text>
        <Text style={estilos.texto}>Contato: {item.contato}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={estilos.container}>
      <FlatList
        data={fornecedores}
        renderItem={({ item }) => <SupplierDetail item={item} />}
        keyExtractor={(item) => item.id}
      />
      <SupplierEdit mostraFornecedores={mostraFornecedores} fornecedorSelecionado={fornecedorSelecionado} setFornecedorSelecionado={setFornecedorSelecionado} />
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