import React, { useEffect, useState } from "react";
import { View, Text, Image, TextInput, SafeAreaView, TouchableOpacity, StyleSheet } from "react-native";
import { widthToDP as wp, heightToDP as hp } from "react-native-responsive-screens";

import logo from '../../../assets/logo.png';

export default function ClientReport({ navigation }) {

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} resizeMode="contain" source={logo} />
            <Text style={styles.title}>Relatório de clientes</Text>
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
});