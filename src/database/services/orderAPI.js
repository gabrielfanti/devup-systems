import { db } from "../SQLite";

export function criaTabela() {
  db.transaction((transaction) => {
    transaction.executeSql("CREATE TABLE IF NOT EXISTS " + 
      "Encomendas " +
      "(id INTEGER PRIMARY KEY AUTOINCREMENT, cliente TEXT, produto TEXT, status TEXT);")
  })
}

export async function adicionaEncomenda(encomenda) {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql("INSERT INTO Encomendas (cliente, produto, status) VALUES (?, ?, ?);", [encomenda.cliente, encomenda.produto, encomenda.status], () => {
        resolve("Encomenda adicionado com sucesso!")
      })
    })
  })
}

export async function atualizaEncomenda(encomenda) {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql("UPDATE Encomendas SET cliente = ?, produto = ?, status = ? WHERE id = ?;", [encomenda.cliente, encomenda.produto, encomenda.status, encomenda.id], () => {
        resolve("Encomenda atualizado com sucesso!")
      })
    })
  })
}

export async function removeEncomenda(encomenda) {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql("DELETE FROM Encomendas WHERE id = ?;", [encomenda.id], () => {
        resolve("Encomenda removido com sucesso!")
      })
    })
  })
}

export async function buscaEncomenda() {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql("SELECT * FROM Encomendas;", [], (transaction, resultado) => {
        resolve(resultado.rows._array)
      })
    })
  })
}
