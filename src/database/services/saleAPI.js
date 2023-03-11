import { db } from "../SQLite";

export function criaTabela() {
  db.transaction((transaction) => {
    transaction.executeSql("CREATE TABLE IF NOT EXISTS " + 
      "Vendas " +
      "(id INTEGER PRIMARY KEY AUTOINCREMENT, cliente TEXT, produto TEXT, quantidade TEXT);")
  })
}

export async function adicionaVenda(venda) {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql("INSERT INTO Vendas (cliente, produto, quantidade) VALUES (?, ?, ?);", [venda.cliente, venda.produto, venda.quantidade], () => {
        resolve("Venda concluída com sucesso!")
      })
    })
  })
}

export async function buscaVenda() {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql("SELECT * FROM Vendas;", [], (transaction, resultado) => {
        resolve(resultado.rows._array)
      })
    })
  })
}