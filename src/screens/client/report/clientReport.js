import React, { useEffect, useState } from "react";
import { View, Text, Image, TextInput, SafeAreaView, TouchableOpacity, StyleSheet } from "react-native";
import { widthToDP as wp, heightToDP as hp } from "react-native-responsive-screens";
import database from "../../../config/firebase";
import { collection } from "firebase/firestore"; 
import { FlatList } from "react-native-gesture-handler";

import logo from '../../../assets/logo.png';

export default function ClientReport({ navigation }) {
    const [cliente, setCliente] = useState([]);

    function deleteCliente(id) {
        database.collection("Clientes").doc(id).delete()
    };

    useEffect(() => {
        database.collection("Clientes").onSnapshot((query) => {
            const list = []
            query.forEach((doc) => {
                list.push({ ...doc.data(), id: doc.id })
            })
            setCliente(list)
        })
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} resizeMode="contain" source={logo} />
            <Text style={styles.title}>Relatório de clientes</Text>
            <FlatList
                showsHorizontalScrollIndicator={false}
                data={cliente}
                renderItem={({ item }) => {
                    return(
                        <View style={styles.clienteContent}>
                        <TouchableOpacity
                            style={styles.deleteCliente}
                            onPress={() => {
                                deleteCliente(item.id)
                            }}>
                        </TouchableOpacity>
                        <Text style={styles.clienteDescription}
                            onPress={() => {
                                navigation.navigate("clientDetails", {
                                    id: item.id, description: item.description
                                })
                            }}>
                            {item.description}
                        </Text>
                    </View>
                    )
                }}
            />
            <View style={{ height: 100 }}></View>
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: wp("45%"),
        height: hp("20%"),
        marginTop: hp("1%"),
        alignSelf: 'center',
    },
    title: {
        fontSize: 22,
        color: "#102055",
        marginBottom: 15,
        fontWeight: "bold"
    },
    clienteContent: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5,
    },
    deleteCliente: {
        backgroundColor: "#102055",
        justifyContent: "center",
        paddingLeft: 150,
    },
    clienteDescription: {
        width: "75%",
        alignContent: "flex-start",
        backgroundColor: "#f5f5f5cf",
        padding: 12,
        paddingHorizontal: 20,
        borderRadius: 50,
        marginBottom: 5,
        marginRight: 15,
        color: "#282bdb5"
    }
});