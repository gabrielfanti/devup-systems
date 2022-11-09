import React, { useState } from "react";
import { View, Text, Image, TextInput, SafeAreaView, TouchableOpacity, StyleSheet } from "react-native";
import { widthToDP as wp, heightToDP as hp } from "react-native-responsive-screens";
import { authentication } from "../../config/firebase";

import logo from '../../assets/logo.png';

export default function NewUser({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorRegister, setErrorRegister] = useState("");

    const registerFirebase = () => {
        authentication.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                let user = userCredential.user;
                navigation.navigate("Login", { idUser: user.uid });
                // ...
            })
            .catch((error) => {
                let errorCode = error.code;
                let errorMessage = error.message;
                // ..
            });
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} resizeMode="contain" source={logo} />
            <Text style={styles.title}>Registre-se</Text>
            <TextInput
                style={styles.input}
                placeholder={"Informe seu e-mail:"}
                type="text"
                onChangeText={(text) => setEmail(text)}
                value={email}
            />
            <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder={"Informe sua senha:"}
                type="text"
                onChangeText={(text) => setPassword(text)}
                value={password}
            />
            {errorRegister === true
                ?
                <View style={styles.contentAlert}>
                    <Text style={styles.warningAlert}>E-mail ou senha inválidos!</Text>
                </View>
                :
                <View />
            }
            {email === "" || password === ""
                ?
                <TouchableOpacity disabled={true} style={styles.buttonRegister}>
                    <Text style={styles.textButtonRegister}>Registrar</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.buttonRegister} onPress={registerFirebase}>
                    <Text style={styles.textButtonRegister}>Registrar</Text>
                </TouchableOpacity>
            }
            <Text style={styles.login}>Já possui um registro?</Text>
            <Text style={styles.linkLogin} onPress={() => navigation.navigate("Login")}>Faça o login!</Text>
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
        fontSize: 30,
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
        borderBottomColor: "#0000cd",
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
    login: {
        marginTop: 20,
        color: "#4d5156",
    },
    linkLogin: {
        color: "#1877f2",
        fontSize: 16,
    }
});