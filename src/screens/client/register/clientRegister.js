import React, { useState } from "react";
import { View, Text, Image, TextInput, SafeAreaView, TouchableOpacity, StyleSheet } from "react-native";
import { widthToDP as wp, heightToDP as hp } from "react-native-responsive-screens";
import firebase from "../../../config/firebase";

import logo from '../../../assets/logo.png';

export default function ClientRegister({ navigation }) {

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} resizeMode="contain" source={logo} />
            <Text style={styles.title}>Cadastro de clientes</Text>
            <TextInput
                style={styles.input}
                placeholder={"Nome:"}
                type="text"
            />
            <TextInput
                style={styles.input}
                placeholder={"CPF:"}
                type="text"
            />
            <TextInput
                style={styles.input}
                placeholder={"Endereço:"}
                type="text"
            />
            <TouchableOpacity style={styles.buttonRegister}>
                <Text style={styles.buttonRegisterText} onPress={() => navigation.navigate("Home")}>Cadastrar</Text>
            </TouchableOpacity>
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
    input: {
        width: 300,
        marginTop: 10,
        padding: 10,
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: "#102055",
        marginLeft: "auto",
        marginRight: "auto",
        color: "#4d5156",
    },
    buttonRegister: {
        width: 200,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#102055",
        borderRadius: 50,
        marginTop: 30,
    },
    textButtonRegister: {
        color: "#ffffff"
    },
    contentAlert: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        color: "#F92E6A",
    },
    warningAlert: {
        paddingLeft: 10,
        color: "#F92E6A",
        fontSize: 16,
    },
    buttonRegisterText: {
        color: "#ffffff",
        fontSize: 16,
    }
});