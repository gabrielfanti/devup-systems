import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";
import { criaTabela, buscaFuncionario } from "../../database/services/employeeAPI";
import EmployeeEdit from "./EmployeeEdit";

export default function EmployeeScreen() {

  useEffect(() => {
    criaTabela();
    mostraFuncionarios();
  }, []);

  const [funcionarios, setFuncionarios] = useState([]);
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState({});

  async function mostraFuncionarios() {
    const todosFuncionarios = await buscaFuncionario();
    setFuncionarios(todosFuncionarios);
  }

  function EmployeeDetail({ item }) {
    return (
      <TouchableOpacity style={estilos.cartao} onPress={() => setFuncionarioSelecionado(item)}>
        <Text style={estilos.texto}>Nome: {item.nome}</Text>
        <Text style={estilos.texto}>Salário: {item.salario}</Text>
        <Text style={estilos.texto}>Contato: {item.vencimento}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={estilos.container}>
      <FlatList
        data={funcionarios}
        renderItem={({ item }) => <EmployeeDetail item={item} />}
        keyExtractor={(item) => item.id}
      />
      <EmployeeEdit mostraFuncionarios={mostraFuncionarios} funcionarioSelecionado={funcionarioSelecionado} setFuncionarioSelecionado={setFuncionarioSelecionado} />
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