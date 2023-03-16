import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as MailComposer from "expo-mail-composer";
import { Picker } from "@react-native-picker/picker";
import { buscaFornecedor } from "../../database/services/supplierAPI";
import { buscaProduto } from "../../database/services/productAPI";

export default function EmailScreen() {
    const [fornecedores, setFornecedores] = useState([]);
    const [fornecedorSelecionado, setFornecedorSelecionado] = useState({});
    const [assunto, setAssunto] = useState("Requisição de produtos");
    const [produto, setProduto] = useState(null);
    const [quantidade, setQuantidade] = useState("01");
    const [modalVisivel, setModalVisivel] = useState(false);
    const [produtos, setProdutos] = useState([]);
    const [produtoSelecionado, setProdutoSelecionado] = useState({});

    useEffect(() => {
        mostraFornecedores();
        mostraProdutos();
    }, []);

    async function mostraFornecedores() {
        const todosFornecedores = await buscaFornecedor();
        setFornecedores(todosFornecedores);
    }

    async function mostraProdutos() {
        const todosProdutos = await buscaProduto();
        setProdutos(todosProdutos);
    }

    function SupplierDetail({ item }) {
        return (
            <TouchableOpacity
                style={estilos.cartao}
                onPress={() => {
                    setFornecedorSelecionado(item);
                    setModalVisivel(true);
                }}
            >
                <Text style={estilos.texto}>Nome: {item.nome}</Text>
                <Text style={estilos.texto}>CNPJ: {item.cnpj}</Text>
                <Text style={estilos.texto}>Contato: {item.contato}</Text>
            </TouchableOpacity>
        );
    }

    function ProductDetail({ item }) {
        return (
            <TouchableOpacity style={estilos.cartao} onPress={() => setProdutoSelecionado(item)}>
                <Text style={estilos.texto}>Nome: {item.nome}</Text>
                <Text style={estilos.texto}>Marca: {item.marca}</Text>
                <Text style={estilos.texto}>Valor: {item.valor}</Text>
            </TouchableOpacity>
        );
    }

    function enviaEmail() {
        MailComposer.composeAsync({
            recipients: [fornecedorSelecionado.contato],
            subject: assunto,
            body: `Olá, Meu estabelecimento comercial gostaria de fazer a solicitação do Produto: ${produto} na Quantidade de: ${quantidade} itens. Para serem entregues no endereço...`,
        });
        setModalVisivel(false);
        setAssunto("");
        setProduto("");
        setQuantidade("");
    }

    return (
        <SafeAreaView style={estilos.container}>
            <FlatList
                data={fornecedores}
                renderItem={({ item }) => <SupplierDetail item={item} />}
                keyExtractor={(item) => item.id}
            />
            <StatusBar />
            {modalVisivel && (
                <View style={estilos.modal}>
                    <Text style={estilos.textoModal}>Enviar e-mail para {fornecedorSelecionado.nome}</Text>
                    <TextInput
                        style={estilos.inputModal}
                        placeholder="Assunto"
                        value={assunto}
                        onChangeText={(texto) => setAssunto(texto)}
                    />
                    <Picker
                        selectedValue={produto}
                        style={estilos.inputModal}
                        onValueChange={(itemValue) => setProduto(itemValue)}
                    >
                        <Picker.Item label="Selecione:" value="" />
                        {produtos.map((produto) => (
                            <Picker.Item label={produto.nome} value={produto.nome} key={produto.id} />
                        ))}
                    </Picker>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ flex: 1 }}>
                            <TextInput
                                style={estilos.inputModal}
                                placeholder="Quantidade"
                                value={quantidade}
                                onChangeText={(texto) => setQuantidade(texto)}
                            />
                        </View>
                    </View>
                    <TouchableOpacity style={estilos.botaoModal} onPress={enviaEmail}>
                        <Text style={estilos.textoBotaoModal}>Enviar</Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
}

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        backgroundColor: '#F6F8FA',
    },
    cartao: {
        borderColor: '#5050ff',
        borderRadius: 4,
        backgroundColor: '#ffffff',
        paddingVertical: 6,
        paddingHorizontal: 16,
        marginHorizontal: 16,
        marginBottom: 8,
        borderTopWidth: 5,
        shadowColor: '#000',
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modal: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 24,
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    tituloModal: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#5050ff',
    },
    inputModal: {
        width: '100%',
        height: 60,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
    },
    botaoModal: {
        backgroundColor: '#5050ff',
        borderRadius: 8,
        padding: 12,
        paddingHorizontal: 48,
    },
    textoModal: {
        fontSize: 14,
        fontWeight: 'bold',
        padding: 20,
    },
    textoBotaoModal: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});