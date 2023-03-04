import React, { useEffect, useState } from "react";
import {
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import * as MailComposer from "expo-mail-composer";
import { criaTabela, buscaFornecedor } from "../../database/services/supplierAPI";

export default function SupplierScreen() {
    const [fornecedores, setFornecedores] = useState([]);
    const [fornecedorSelecionado, setFornecedorSelecionado] = useState({});
    const [assunto, setAssunto] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [modalVisivel, setModalVisivel] = useState(false);

    useEffect(() => {
        criaTabela();
        mostraFornecedores();
    }, []);

    async function mostraFornecedores() {
        const todosFornecedores = await buscaFornecedor();
        setFornecedores(todosFornecedores);
        console.log(todosFornecedores);
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

    function enviaEmail() {
        MailComposer.composeAsync({
            recipients: [fornecedorSelecionado.contato],
            subject: assunto,
            body: mensagem,
        });
        setModalVisivel(false);
        setAssunto("");
        setMensagem("");
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
                        onChangeText={(texto) => setAssunto(texto)}
                    />
                    <TextInput
                        style={[estilos.inputModal, { height: 200 }]}
                        multiline={true}
                        placeholder="Mensagem"
                        onChangeText={(texto) => setMensagem(texto)}
                    />
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
