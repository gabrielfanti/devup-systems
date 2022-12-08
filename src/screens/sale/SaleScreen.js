import { View, FlatList, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useEffect, useState } from "react";
import { ClientDetail } from "./ClientDetail";
import { buscaCliente } from "../../database/services/clientAPI";

export default function SaleScreen() {

    useEffect(() => {
        mostraClientes()
    }, [])

    const [clientes, setClientes] = useState([])

    async function mostraClientes() {
        const todosClientes = await buscaCliente()
        setClientes(todosClientes)
        console.log(todosClientes)
    }

    const selectClient = () => {
        return (
            <SafeAreaView style={estilos.container}>
                <FlatList
                    data={clientes}
                    renderItem={(cliente) => <ClientDetail {...cliente} />}
                    keyExtractor={cliente => cliente.id} />
                <StatusBar />
            </SafeAreaView>
        )
    };

    const newSale = () => {
        return true;
    };

    return (
        <View style={estilos.container}>
            <View>
                <TouchableOpacity onPress={() => { selectClient() }} style={estilos.selectClient}>
                    <Text style={estilos.selectClientText}>Selecionar cliente</Text>
                </TouchableOpacity>
            </View>
            <View style={estilos.addButtonContainer}>
                <TouchableOpacity onPress={() => { newSale() }} style={estilos.addButton}>
                    <Text style={estilos.addButtonText}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const estilos = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "stretch",
        justifyContent: "flex-start",
    },
    selectClient: {
        backgroundColor: "#5050ff",
        padding: 12,
        width: '100%',
        alignItems: "center",
    },
    selectClientText: {
        color: "#FFFFFF",
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
    addButtonContainer: {
        marginTop: 550
    }
})