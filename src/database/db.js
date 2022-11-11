const { Client } = require('pg');

const db = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'myInfoDatabase',
  password: 'postgres',
  port: 5432,
})

db.connect();

exports.selectClientes = async function getClientes() {
  db.query('SELECT * FROM clientes', (err, res) => {
      if (err) {
        console.log(err.stack)
      } else {
        console.log(res.rows)
      }
    })
}

// getClientes();

const SetClientes = 'INSERT INTO clientes(nome, cpf, logradouro, cidade) VALUES ($1, $2, $3, $4) RETURNING *';
const values = ['Gabriel Valério', '11122233300', 'Shibuya', 'Tokyo'];

exports.insertClientes = async function setClientes() {
    db.query(SetClientes, values, (err, res) => {
        if(err) {
            console.log(err.stack);
        } else {
            console.log(res.rows[0]);
        }
    });
}