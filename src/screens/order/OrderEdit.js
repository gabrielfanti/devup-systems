import React, { useEffect, useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { adicionaEncomenda, atualizaEncomenda, removeEncomenda } from "../../database/services/orderAPI";

export default function OrderEdit({ mostraEncomendas, encomendaSelecionada, setEncomendaSelecionada }) {
  useEffect(() => {
    if (encomendaSelecionada.id) {
      preencheModal()
      setEncomendaParaAtualizar(true)
      setModalVisivel(true)
      return
    }
    setEncomendaParaAtualizar(false)
  }, [encomendaSelecionada])

  const [cliente, setCliente] = useState("")
  const [produto, setProduto] = useState("")
  const [status, setStatus] = useState("")
  const [modalVisivel, setModalVisivel] = useState(false)
  const [encomendaParaAtualizar, setEncomendaParaAtualizar] = useState(false)

  async function salvaEncomenda() {
    const novaEncomenda = {
      cliente: cliente,
      produto: produto,
      status: status,
    }
    await adicionaEncomenda(novaEncomenda)
    mostraEncomendas()
    limpaModal()
  }

  async function modificaEncomenda() {
    const novaEncomenda = {
      cliente: cliente,
      produto: produto,
      status: status,
      id: encomendaSelecionada.id
    }
    await atualizaEncomenda(novaEncomenda)
    mostraEncomendas()
    limpaModal()
  }

  async function deletaEncomenda() {
    await removeEncomenda(encomendaSelecionada)
    mostraEncomendas()
    limpaModal()
  }

  function preencheModal() {
    setCliente(encomendaSelecionada.cliente)
    setProduto(encomendaSelecionada.produto)
    setStatus(encomendaSelecionada.status)
  }

  function limpaModal() {
    setCliente("")
    setProduto("")
    setStatus("")
    setEncomendaSelecionada({})
    setModalVisivel(false)
  }

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={() => { setModalVisivel(false) }}
      >
        <View style={estilos.centralizaModal}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={estilos.modal}>
              <Text style={estilos.modalTitulo}>Cadastrar fornecedor</Text>
              <Text style={estilos.modalSubTitulo}>Dados do fornecedor:</Text>
              <TextInput
                style={estilos.modalInput}
                multiline={true}
                numberOfLines={2}
                onChangeText={novoCliente => setCliente(novoCliente)}
                placeholder="Digite aqui o cliente:"
                value={cliente} />
              <TextInput
                style={estilos.modalInput}
                multiline={true}
                numberOfLines={2}
                onChangeText={novoProduto => setProduto(novoProduto)}
                placeholder="Digite aqui o produto:"
                value={produto} />
              <TextInput
                style={estilos.modalInput}
                multiline={true}
                numberOfLines={2}
                onChangeText={novoStatus => setStatus(novoStatus)}
                placeholder="Digite aqui o status:"
                value={status} />
              <View style={estilos.modalBotoes}>
                <TouchableOpacity style={estilos.modalBotaoSalvar} onPress={() => {
                  encomendaParaAtualizar ? modificaEncomenda() : salvaEncomenda()
                }}>
                  <Text style={estilos.modalBotaoTexto}>Salvar</Text>
                </TouchableOpacity>
                {encomendaParaAtualizar ?
                  <TouchableOpacity style={estilos.modalBotaoDeletar} onPress={() => { deletaEncomenda() }}>
                    <Text style={estilos.modalBotaoTexto}>Deletar</Text>
                  </TouchableOpacity> : <></>
                }
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
  )
}

const estilos = StyleSheet.create({
  centralizaModal: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end"
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
    fontWeight: "600"
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
    justifyContent: "space-between"
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
  }
});