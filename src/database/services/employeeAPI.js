import { db } from "../SQLite";

export function criaTabela() {
  db.transaction((transaction) => {
    transaction.executeSql("CREATE TABLE IF NOT EXISTS " + 
      "Funcionarios " +
      "(id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, salario TEXT, vencimento TEXT);")
  })
}

export async function adicionaFuncionario(funcionario) {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql("INSERT INTO Funcionarios (nome, salario, vencimento) VALUES (?, ?, ?);", [funcionario.nome, funcionario.salario, funcionario.vencimento], () => {
        resolve("Funcionario adicionado com sucesso!")
      })
    })
  })
}

export async function atualizaFuncionario(funcionario) {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql("UPDATE Funcionarios SET nome = ?, salario = ?, vencimento = ? WHERE id = ?;", [funcionario.nome, funcionario.salario, funcionario.vencimento, funcionario.id], () => {
        resolve("Funcionario atualizado com sucesso!")
      })
    })
  })
}

export async function removeFuncionario(funcionario) {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql("DELETE FROM Funcionarios WHERE id = ?;", [funcionario.id], () => {
        resolve("Funcionario removido com sucesso!")
      })
    })
  })
}

export async function buscaFuncionario() {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql("SELECT * FROM Funcionarios;", [], (transaction, resultado) => {
        resolve(resultado.rows._array)
      })
    })
  })
}
