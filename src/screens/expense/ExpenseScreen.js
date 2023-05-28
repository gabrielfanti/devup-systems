import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";
import { criaTabela, buscaDespesa } from "../../database/services/expenseAPI";
import ExpenseEdit from "./ExpenseEdit";

export default function ExpenseScreen() {

  useEffect(() => {
    criaTabela();
    mostraDespesas();
  }, []);

  const [despesas, setDespesas] = useState([]);
  const [despesaSelecionada, setDespesaSelecionada] = useState({});

  async function mostraDespesas() {
    const todasDespesas = await buscaDespesa();
    setDespesas(todasDespesas);
  }

  function ExpenseDetail({ item }) {
    return (
      <TouchableOpacity style={estilos.cartao} onPress={() => setDespesaSelecionada(item)}>
        <Text style={estilos.texto}>Descrição: {item.descricao}</Text>
        <Text style={estilos.texto}>Valor: {item.valor}</Text>
        <Text style={estilos.texto}>Vencimento: {item.vencimento}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={estilos.container}>
      <FlatList
        data={despesas}
        renderItem={({ item }) => <ExpenseDetail item={item} />}
        keyExtractor={(item) => item.id}
      />
      <ExpenseEdit mostraDespesas={mostraDespesas} despesaSelecionada={despesaSelecionada} setDespesaSelecionada={setDespesaSelecionada} />
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