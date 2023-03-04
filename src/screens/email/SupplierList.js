import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('fornecedores.db');

export default function SupplierList() {
  const [fornecedores, setFornecedores] = useState([]);

  useEffect(() => {
    criaTabela();
    buscaFornecedor().then((result) => setFornecedores(result));
  }, []);

  function criaTabela() {
    db.transaction((transaction) => {
      transaction.executeSql(
        'CREATE TABLE IF NOT EXISTS Fornecedores (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, cnpj TEXT, contato TEXT);'
      );
    });
  }

  async function buscaFornecedor() {
    return new Promise((resolve) => {
      db.transaction((transaction) => {
        transaction.executeSql('SELECT * FROM Fornecedores;', [], (transaction, resultado) => {
          resolve(resultado.rows._array);
        });
      });
    });
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Lista de fornecedores</Text>
      <FlatList
        data={fornecedores}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 8 }}>
            <Text style={{ fontWeight: 'bold' }}>{item.nome}</Text>
            <Text>{item.cnpj}</Text>
            <Text>{item.contato}</Text>
          </View>
        )}
      />
    </View>
  );
}
