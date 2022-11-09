import React, { useState } from "react";
import { View, Text, Image, TextInput, SafeAreaView, TouchableOpacity, StyleSheet } from "react-native";
import { widthToDP as wp, heightToDP as hp } from "react-native-responsive-screens";
import { database } from "../../../config/firebase";

import logo from '../../../assets/logo.png';

export default function SupplierRegister({ navigation }) {
    const [empresa, setEmpresa] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [representante, setRepresentante] = useState("");
    const [contato, setContato] = useState("");

    const submit = () => {
        database.collection("Fornecedores").add({
          Empresa: empresa,
          CNPJ: cnpj,
          Representante: representante,
          Contato: contato,
        });
      };

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} resizeMode="contain" source={logo} />
            <Text style={styles.title}>Cadastro de fornecedores</Text>
            <TextInput
                style={styles.input}
                placeholder={"Empresa:"}
                onChangeText={setEmpresa}
                value={empresa}
                type="text"
            />
            <TextInput
                style={styles.input}
                placeholder={"CNPJ:"}
                onChangeText={setCnpj}
                value={cnpj}
                type="number"
            />
            <TextInput
                style={styles.input}
                placeholder={"Representante:"}
                onChangeText={setRepresentante}
                value={representante}
                type="text"
            />
            <TextInput
                style={styles.input}
                placeholder={"Contato:"}
                onChangeText={setContato}
                value={contato}
                type="text"
            />
            <TouchableOpacity style={styles.buttonRegister}
            onPress={() => submit() }>
                <Text style={styles.buttonRegisterText}>Cadastrar</Text>
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