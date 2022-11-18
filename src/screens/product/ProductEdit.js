import React, { useEffect, useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { adicionaProduto, atualizaProduto, removeProduto } from "../../database/services/productAPI";

export default function ProductEdit({ mostraProdutos, produtoSelecionado, setProdutoSelecionado }) {
  useEffect(() => {
    if (produtoSelecionado.id) {
      preencheModal()
      setProdutoParaAtualizar(true)
      setModalVisivel(true)
      return
    }
    setProdutoParaAtualizar(false)
  }, [produtoSelecionado])

  const [nome, setNome] = useState("")
  const [marca, setMarca] = useState("")
  const [valor, setValor] = useState("")
  const [modalVisivel, setModalVisivel] = useState(false)
  const [produtoParaAtualizar, setProdutoParaAtualizar] = useState(false)

  async function salvaProduto() {
    const novoProduto = {
      nome: nome,
      marca: marca,
      valor: valor,
    }
    await adicionaProduto(novoProduto)
    mostraProdutos()
    limpaModal()
  }

  async function modificaProduto() {
    const novoProduto = {
      nome: nome,
      marca: marca,
      valor: valor,
      id: produtoSelecionado.id
    }
    await atualizaProduto(novoProduto)
    mostraProdutos()
    limpaModal()
  }

  async function deletaProduto() {
    await removeProduto(produtoSelecionado)
    mostraProdutos()
    limpaModal()
  }

  function preencheModal() {
    setNome(produtoSelecionado.nome)
    setMarca(produtoSelecionado.marca)
    setValor(produtoSelecionado.valor)
  }

  function limpaModal() {
    setNome("")
    setMarca("")
    setValor("")
    setProdutoSelecionado({})
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
              <Text style={estilos.modalTitulo}>Cadastrar produto</Text>
              <Text style={estilos.modalSubTitulo}>Dados do produto:</Text>
              <TextInput
                style={estilos.modalInput}
                multiline={true}
                numberOfLines={2}
                onChangeText={novoNome => setNome(novoNome)}
                placeholder="Digite aqui o nome:"
                value={nome} />
              <TextInput
                style={estilos.modalInput}
                multiline={true}
                numberOfLines={2}
                onChangeText={novaMarca => setMarca(novaMarca)}
                placeholder="Digite aqui a marca:"
                value={marca} />
              <TextInput
                style={estilos.modalInput}
                multiline={true}
                numberOfLines={2}
                onChangeText={novoValor => setValor(novoValor)}
                placeholder="Digite aqui o valor:"
                value={contato} />
              <View style={estilos.modalBotoes}>
                <TouchableOpacity style={estilos.modalBotaoSalvar} onPress={() => {
                  produtoParaAtualizar ? modificaProduto() : salvaProduto()
                }}>
                  <Text style={estilos.modalBotaoTexto}>Salvar</Text>
                </TouchableOpacity>
                {produtoParaAtualizar ?
                  <TouchableOpacity style={estilos.modalBotaoDeletar} onPress={() => { deletaProduto() }}>
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