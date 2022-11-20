import { db } from "../SQLite";

export function criaTabela() {
  db.transaction((transaction) => {
    transaction.executeSql("CREATE TABLE IF NOT EXISTS " + 
      "Fornecedores " +
      "(id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, cnpj TEXT, contato TEXT);")
  })
}

export async function adicionaFornecedor(fornecedor) {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql("INSERT INTO Fornecedores (nome, cnpj, contato) VALUES (?, ?, ?);", [fornecedor.nome, fornecedor.cnpj, fornecedor.contato], () => {
        resolve("Fornecedor adicionado com sucesso!")
      })
    })
  })
}

export async function atualizaFornecedor(fornecedor) {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql("UPDATE Fornecedores SET nome = ?, cnpj = ?, contato = ? WHERE id = ?;", [fornecedor.nome, fornecedor.cnpj, fornecedor.contato, fornecedor.id], () => {
        resolve("Fornecedor atualizado com sucesso!")
      })
    })
  })
}

export async function removeFornecedor(fornecedor) {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql("DELETE FROM Fornecedores WHERE id = ?;", [fornecedor.id], () => {
        resolve("Fornecedores removido com sucesso!")
      })
    })
  })
}

export async function buscaFornecedor() {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql("SELECT * FROM Fornecedores;", [], (transaction, resultado) => {
        resolve(resultado.rows._array)
      })
    })
  })
}
