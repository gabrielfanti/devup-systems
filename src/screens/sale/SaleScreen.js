import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { buscaCliente } from "../../database/services/clientAPI";
import { buscaProduto } from "../../database/services/productAPI";

export default function SaleScreen({ navigation }) {
    const [clientes, setClientes] = useState([]);
    const [clienteSelecionado, setClienteSelecionado] = useState({});
    const [produto, setProduto] = useState(null);
    const [produtos, setProdutos] = useState([]);
    const [quantidade, setQuantidade] = useState("01");
    const [modalVisivel, setModalVisivel] = useState(false);

    useEffect(() => {
        mostraClientes();
        mostraProdutos();
    }, []);

    async function mostraClientes() {
        const todosClientes = await buscaCliente();
        setClientes(todosClientes);
        console.log(todosClientes);
    }

    async function mostraProdutos() {
        const todosProdutos = await buscaProduto();
        setProdutos(todosProdutos);
        console.log(todosProdutos);
    }

    function ClientDetail({ item }) {
        return (
            <TouchableOpacity
                style={estilos.cartao}
                onPress={() => {
                    setClienteSelecionado(item);
                    setModalVisivel(true);
                }}
            >
                <Text style={estilos.texto}>Nome: {item.nome}</Text>
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
            <StatusBar />
            {modalVisivel && (
                <View style={estilos.modal}>
                    <Text style={estilos.textoModal}>Cliente: {clienteSelecionado.nome}</Text>
                    <Text>Selecione um produto:</Text>
                    <View style={{ flexDirection: "row" }}>
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
                        <View style={{ flex: 1 }}>
                            <TextInput
                                style={estilos.inputModal}
                                placeholder="Quantidade"
                                value={quantidade}
                                onChangeText={(texto) => setQuantidade(texto)}
                            />
                        </View>
                    </View>
                    <TouchableOpacity style={estilos.botaoModal} onPress={() => navigation.goBack()}>
                        <Text style={estilos.textoBotaoModal}>Finalizar</Text>
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
    modal: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 24,
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    inputModal: {
        width: '80%',
        height: 60,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
    },
    botaoModal: {
        backgroundColor: '#5050ff',
        borderRadius: 8,
        padding: 12,
        paddingHorizontal: 48,
    },
    textoModal: {
        fontSize: 16,
        fontWeight: 'bold',
        padding: 20,
    },
    textoBotaoModal: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});