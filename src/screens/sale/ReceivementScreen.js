import React, { useState, useEffect } from "react";
import { View, SafeAreaView, Text, Alert, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { SaleDetail } from "./SaleDetail";
import { ValueDetail } from "./ValueDetail";
import { criaTabela, buscaProduto } from "../../database/services/productAPI";
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { TextInput } from "react-native-gesture-handler";

export default function ReceivementScreen( { item }) {
    const [selectedPayment, setSelectedPayment] = useState();
    const navigation = useNavigation();

    useEffect(() => {
        criaTabela()
        mostraProdutos()
    }, [])

    const [produtos, setProdutos] = useState([])
    const [produtoSelecionado, setProdutoSelecionado] = useState({})

    async function mostraProdutos() {
        const todosProdutos = await buscaProduto()
        setProdutos(todosProdutos)
        console.log(todosProdutos)
    }

    const showAlert = () =>
        Alert.alert(
            "Pagamento recebido",
            "Finalizando venda, pressione o botão confimar para retornar à Home.",
            [
                {
                    text: "Confirmar",
                    onPress: () => navigation.navigate("Home"),
                    style: "cancel",
                },
            ],
            {
                cancelable: false,
            }
        );

        const valorProduto= () => {
            return(
                <FlatList
                data={produtos}
                renderItem={(produto) => <SaleDetail {...produto} setProdutoSelecionado={setProdutoSelecionado} />}
                keyExtractor={produto => produto.valor} />
            )
        }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.titulo}>Produto selecionado:</Text>
            </View>
            <FlatList
                data={produtos}
                renderItem={(produto) => <SaleDetail {...produto} setProdutoSelecionado={setProdutoSelecionado} />}
                keyExtractor={produto => produto.id} />
            <View style={{ marginTop: 5 }}>
                <View style={styles.container}>
                    <Text style={styles.titulo}>Escolha a forma de pagamento:</Text>
                </View>
                <View style={styles.spacer}>
                    <Picker disabled={true}
                        selectedValue={selectedPayment}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedPayment(itemValue)
                        }>
                        <Picker.Item label="Dinheiro" value="dinheiro" />
                    </Picker>
                </View>
                <Text style={{ textAlign: "center", marginTop: 80 }}>Informe o valor:</Text>
                <View style={styles.containerValor}>
                <FlatList
                data={produtos}
                renderItem={(produto) => <ValueDetail {...produto} setProdutoSelecionado={setProdutoSelecionado} />}
                keyExtractor={produto => produto.id} />
                </View>
                <TouchableOpacity style={styles.buttonDisabled}>
                    <Text style={{ textAlign: "center", color: "#ffffff" }}>Adicionar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonEnabled} onPress={(showAlert)}>
                    <Text style={{ textAlign: "center", color: "#ffffff" }}>Valor total</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        marginTop: 10,
        marginBottom: 20,
    },
    containerValor: {
        alignItems: "center",
        padding: 6,
        marginHorizontal: 170,
        marginTop: 5,
        marginBottom: 20,
        borderWidth: 2,
        borderRadius: 4,
        borderColor: "#5050ff",
        backgroundColor: "#f0f0f0",
    },
    titulo: {
        fontSize: 20,
    },
    texto: {
        fontSize: 16,
        textAlign: "center",
    },
    textInput: {
        borderWidth: 2,
        borderRadius: 4,
        padding: 2,
        borderColor: "#5050ff",
        backgroundColor: "#f0f0f0",
        paddingHorizontal: 40,
        marginBottom: 20,
    },
    buttonEnabled: {
        padding: 10,
        elevation: 8,
        borderRadius: 6,
        marginBottom: 50,
        marginHorizontal: 120,
        backgroundColor: "#5050ff",
    },
    buttonDisabled: {
        padding: 10,
        elevation: 8,
        borderRadius: 6,
        marginBottom: 4,
        marginHorizontal: 120,
        backgroundColor: '#999999',
    },
    spacer: {
        marginTop: 15,
        paddingHorizontal: 110,
    }
})