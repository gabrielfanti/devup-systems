import { db } from "../SQLite";

export function criaTabela() {
  db.transaction((transaction) => {
    transaction.executeSql("CREATE TABLE IF NOT EXISTS " + 
      "Produtos " +
      "(id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, marca TEXT, valor TEXT);")
  })
}

export async function adicionaProduto(produto) {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql("INSERT INTO Produtos (nome, marca, valor) VALUES (?, ?, ?);", [produto.nome, produto.marca, produto.valor], () => {
        resolve("Produto adicionado com sucesso!")
      })
    })
  })
}

export async function atualizaProduto(produto) {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql("UPDATE Produtos SET nome = ?, marca = ?, valor = ? WHERE id = ?;", [produto.nome, produto.marca, produto.valor, produto.id], () => {
        resolve("Produto atualizado com sucesso!")
      })
    })
  })
}

export async function removeProduto(produto) {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql("DELETE FROM Produtos WHERE id = ?;", [produto.id], () => {
        resolve("Produto removido com sucesso!")
      })
    })
  })
}

export async function buscaProduto() {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql("SELECT * FROM Produtos;", [], (transaction, resultado) => {
        resolve(resultado.rows._array)
      })
    })
  })
}
