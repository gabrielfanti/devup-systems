import { db } from "../SQLite";

export function criaTabela() {
  db.transaction((transaction) => {
    transaction.executeSql("CREATE TABLE IF NOT EXISTS " + 
      "Clientes " +
      "(id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, cpf TEXT, contato TEXT);")
  })
}

export async function adicionaCliente(cliente) {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql("INSERT INTO Clientes (nome, cpf, contato) VALUES (?, ?, ?);", [cliente.nome, cliente.cpf, cliente.contato], () => {
        resolve("Cliente adicionado com sucesso!")
      })
    })
  })
}

export async function atualizaCliente(cliente) {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql("UPDATE Clientes SET nome = ?, cpf = ?, contato = ? WHERE id = ?;", [cliente.nome, cliente.cpf, cliente.contato, cliente.id], () => {
        resolve("Cliente atualizado com sucesso!")
      })
    })
  })
}

export async function removeCliente(cliente) {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql("DELETE FROM Clientes WHERE id = ?;", [cliente.id], () => {
        resolve("Cliente removido com sucesso!")
      })
    })
  })
}

export async function buscaCliente() {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql("SELECT * FROM Clientes;", [], (transaction, resultado) => {
        resolve(resultado.rows._array)
      })
    })
  })
}
