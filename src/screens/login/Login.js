import React, { useState, useEffect } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, SafeAreaView, StyleSheet } from "react-native";
import { widthToDP as wp, heightToDP as hp } from "react-native-responsive-screens";
import firebase from "../../config/firebase";

import logo from '../../assets/logo.png';
import Home from '../home/Home';
import Register from "../user/newUser";


export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorLogin, setErrorLogin] = useState("");

    const loginFirebase = () => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                let user = userCredential.user;
                navigation.navigate("Home", { idUser: user.uid });
            })
            .catch((error) => {
                setErrorLogin(true);
                let errorCode = error.code;
                let errorMessage = error.message;
            });
    }

    useEffect(() => {

    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} resizeMode="contain" source={logo} />
            <Text style={styles.title}>Login</Text>
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
            {errorLogin === true
                ?
                <View style={styles.contentAlert}>
                    <Text style={styles.warningAlert}>E-mail ou senha inválidos!</Text>
                </View>
                :
                <View />
            }
            {email === "" || password === ""
                ?
                <TouchableOpacity disabled={true} style={styles.buttonLogin}>
                    <Text style={styles.textButtonLogin}>Entrar</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.buttonLogin} onPress={loginFirebase}>
                    <Text style={styles.textButtonLogin}>Entrar</Text>
                </TouchableOpacity>
            }
            <Text style={styles.registration}>Não tem um cadastro?</Text>
            <Text style={styles.linkRegister} onPress={() => navigation.navigate("newUser")}>Registre-se</Text>
            <View style={{ height: 100 }}></View>

        </SafeAreaView>
    );
};

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
        color: "#0000cd",
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
    buttonLogin: {
        width: 200,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0000cd",
        borderRadius: 50,
        marginTop: 30,
    },
    textButtonLogin: {
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
    registration: {
        marginTop: 20,
        color: "#4d5156",
    },
    linkRegister: {
        color: "#1877f2",
        fontSize: 16,
    }
});