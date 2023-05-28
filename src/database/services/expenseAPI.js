import { db } from "../SQLite";

export function criaTabela() {
  db.transaction((transaction) => {
    transaction.executeSql("CREATE TABLE IF NOT EXISTS " + 
      "Despesas " +
      "(id INTEGER PRIMARY KEY AUTOINCREMENT, descricao TEXT, valor TEXT, vencimento TEXT);")
  })
}

export async function adicionaDespesa(despesa) {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql("INSERT INTO Despesas (descricao, valor, vencimento) VALUES (?, ?, ?);", [despesa.descricao, despesa.valor, despesa.vencimento], () => {
        resolve("Despesa adicionada com sucesso!")
      })
    })
  })
}

export async function atualizaDespesa(despesa) {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql("UPDATE Despesas SET descricao = ?, valor = ?, vencimento = ? WHERE id = ?;", [despesa.descricao, despesa.valor, despesa.vencimento, despesa.id], () => {
        resolve("Despesa atualizada com sucesso!")
      })
    })
  })
}

export async function removeDespesa(despesa) {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql("DELETE FROM Despesas WHERE id = ?;", [despesa.id], () => {
        resolve("Despesa removida com sucesso!")
      })
    })
  })
}

export async function buscaDespesa() {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql("SELECT * FROM Despesas;", [], (transaction, resultado) => {
        resolve(resultado.rows._array)
      })
    })
  })
}
