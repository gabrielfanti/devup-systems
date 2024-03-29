import React, { useEffect, useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { adicionaCliente, atualizaCliente, removeCliente } from "../../database/services/clientAPI";

export default function ClientEdit({ mostraClientes, clienteSelecionado, setClienteSelecionado }) {
  useEffect(() => {
    if (clienteSelecionado.id) {
      preencheModal();
      setClienteParaAtualizar(true);
      setModalVisivel(true);
      return;
    }
    setClienteParaAtualizar(false);
  }, [clienteSelecionado]);

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [contato, setContato] = useState("");
  const [modalVisivel, setModalVisivel] = useState(false);
  const [clienteParaAtualizar, setClienteParaAtualizar] = useState(false);

  function formatarCPF(cpf) {
    const numerosCPF = cpf.replace(/\D/g, "");

    const cpfFormatado = numerosCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

    return cpfFormatado;
  }

  function formatarContato(contato) {
    const numerosContato = contato.replace(/\D/g, "");
    if (numerosContato.length === 11) {
      const contatoFormatado = numerosContato.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
      return contatoFormatado;
    } else if (numerosContato.length === 10) {
      const contatoFormatado = numerosContato.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
      return contatoFormatado;
    }

    return contato;
  }

  async function salvaCliente() {
    const novoCliente = {
      nome: nome,
      cpf: cpf,
      contato: contato,
    };
    await adicionaCliente(novoCliente);
    mostraClientes();
    limpaModal();
  }

  async function modificaCliente() {
    const novoCliente = {
      nome: nome,
      cpf: cpf,
      contato: contato,
      id: clienteSelecionado.id,
    };
    await atualizaCliente(novoCliente);
    mostraClientes();
    limpaModal();
  }

  async function deletaCliente() {
    await removeCliente(clienteSelecionado);
    mostraClientes();
    limpaModal();
  }

  function preencheModal() {
    setNome(clienteSelecionado.nome);
    setCpf(clienteSelecionado.cpf);
    setContato(clienteSelecionado.contato);
  }

  function limpaModal() {
    setNome("");
    setCpf("");
    setContato("");
    setClienteSelecionado({});
    setModalVisivel(false);
  }

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={() => {
          setModalVisivel(false);
        }}
      >
        <View style={estilos.centralizaModal}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={estilos.modal}>
              <Text style={estilos.modalTitulo}>Cadastrar cliente</Text>
              <Text style={estilos.modalSubTitulo}>Dados do cliente:</Text>
              <TextInput
                style={estilos.modalInput}
                multiline={true}
                numberOfLines={2}
                onChangeText={(novoNome) => setNome(novoNome)}
                placeholder="Digite aqui o nome:"
                value={nome}
              />
              <TextInput
                style={estilos.modalInput}
                multiline={true}
                numberOfLines={2}
                onChangeText={(novoCpf) => setCpf(formatarCPF(novoCpf))}
                placeholder="Digite aqui o CPF:"
                value={cpf}
              />
              <TextInput
                style={estilos.modalInput}
                multiline={true}
                numberOfLines={2}
                onChangeText={(novoContato) => setContato(formatarContato(novoContato))}
                placeholder="Digite aqui o contato:"
                value={contato}
              />
              <View style={estilos.modalBotoes}>
                <TouchableOpacity
                  style={estilos.modalBotaoSalvar}
                  onPress={() => {
                    clienteParaAtualizar ? modificaCliente() : salvaCliente();
                  }}
                >
                  <Text style={estilos.modalBotaoTexto}>Salvar</Text>
                </TouchableOpacity>
                {clienteParaAtualizar ? (
                  <TouchableOpacity style={estilos.modalBotaoDeletar} onPress={() => { deletaCliente() }}>
                    <Text style={estilos.modalBotaoTexto}>Deletar</Text>
                  </TouchableOpacity>
                ) : (
                  <></>
                )}
                <TouchableOpacity style={estilos.modalBotaoCancelar} onPress={() => { limpaModal() }}>
                  <Text style={estilos.modalBotaoTexto}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
      <TouchableOpacity onPress={() => { setModalVisivel(true) }} style={estilos.addButton}>
        <Text style={estilos.addButtonText}>+</Text>
      </TouchableOpacity>
    </>
  );
}

const estilos = StyleSheet.create({
  centralizaModal: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  modal: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
    marginTop: 8,
    marginHorizontal: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  modalTitulo: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 18,
  },
  modalSubTitulo: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: "600",
  },
  modalInput: {
    fontSize: 16,
    marginBottom: 12,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#5050ff",
  },
  modalBotoes: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalBotaoSalvar: {
    backgroundColor: "#5050ff",
    borderRadius: 5,
    padding: 8,
    width: 80,
    alignItems: "center",
  },
  modalBotaoDeletar: {
    backgroundColor: "#d62a18",
    borderRadius: 5,
    padding: 8,
    width: 80,
    alignItems: "center",
  },
  modalBotaoCancelar: {
    backgroundColor: "#5050ff",
    borderRadius: 5,
    padding: 8,
    width: 80,
    alignItems: "center",
  },
  modalBotaoTexto: {
    color: "#ffffff",
  },
  addButton: {
    backgroundColor: "#5050ff",
    justifyContent: "center",
    height: 64,
    width: 64,
    margin: 16,
    alignItems: "center",
    borderRadius: 9999,
    position: "absolute",
    bottom: 0,
    right: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  addButtonText: {
    fontSize: 32,
    lineHeight: 40,
    color: "#FFFFFF",
  },
});
