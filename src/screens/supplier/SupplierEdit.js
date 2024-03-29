import React, { useEffect, useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { adicionaFornecedor, atualizaFornecedor, removeFornecedor } from "../../database/services/supplierAPI";

export default function SupplierEdit({ mostraFornecedores, fornecedorSelecionado, setFornecedorSelecionado }) {
  useEffect(() => {
    if (fornecedorSelecionado.id) {
      preencheModal()
      setFornecedorParaAtualizar(true)
      setModalVisivel(true)
      return
    }
    setFornecedorParaAtualizar(false)
  }, [fornecedorSelecionado])

  const [nome, setNome] = useState("")
  const [cnpj, setCnpj] = useState("")
  const [contato, setContato] = useState("")
  const [modalVisivel, setModalVisivel] = useState(false)
  const [fornecedorParaAtualizar, setFornecedorParaAtualizar] = useState(false)

  function formatarCNPJ(cnpj) {
    const numerosCNPJ = cnpj.replace(/\D/g, "");

    const cnpjFormatado = numerosCNPJ.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      "$1.$2.$3/$4-$5"
    );

    return cnpjFormatado;
  }

  async function salvaFornecedor() {
    const novoFornecedor = {
      nome: nome,
      cnpj: cnpj,
      contato: contato,
    }
    await adicionaFornecedor(novoFornecedor)
    mostraFornecedores()
    limpaModal()
  }

  async function modificaFornecedor() {
    const novoFornecedor = {
      nome: nome,
      cnpj: cnpj,
      contato: contato,
      id: fornecedorSelecionado.id
    }
    await atualizaFornecedor(novoFornecedor)
    mostraFornecedores()
    limpaModal()
  }

  async function deletaFornecedor() {
    await removeFornecedor(fornecedorSelecionado)
    mostraFornecedores()
    limpaModal()
  }

  function preencheModal() {
    setNome(fornecedorSelecionado.nome)
    setCnpj(fornecedorSelecionado.cnpj)
    setContato(fornecedorSelecionado.contato)
  }

  function limpaModal() {
    setNome("")
    setCnpj("")
    setContato("")
    setFornecedorSelecionado({})
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
                onChangeText={novoNome => setNome(novoNome)}
                placeholder="Digite aqui o nome:"
                value={nome} />
              <TextInput
                style={estilos.modalInput}
                multiline={true}
                numberOfLines={2}
                onChangeText={novoCnpj => setCnpj(formatarCNPJ(novoCnpj))}
                placeholder="Digite aqui o CNPJ:"
                value={cnpj} />
              <TextInput
                style={estilos.modalInput}
                multiline={true}
                numberOfLines={2}
                onChangeText={novoContato => setContato(novoContato)}
                placeholder="Digite aqui o e-mail:"
                value={contato} />
              <View style={estilos.modalBotoes}>
                <TouchableOpacity style={estilos.modalBotaoSalvar} onPress={() => {
                  fornecedorParaAtualizar ? modificaFornecedor() : salvaFornecedor()
                }}>
                  <Text style={estilos.modalBotaoTexto}>Salvar</Text>
                </TouchableOpacity>
                {fornecedorParaAtualizar ?
                  <TouchableOpacity style={estilos.modalBotaoDeletar} onPress={() => { deletaFornecedor() }}>
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