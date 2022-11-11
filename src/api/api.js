(async () => {
    const db = require("./db");
    console.log('Iniciando conexão...');
    console.log('INSERT INTO usuario');
    const user = await db.resultsInsertUsuario();
    console.log(user)
  })();
  
  (async () => {
    const db = require("./db");
    console.log('Iniciando conexão...');
    console.log('SELECT * FROM usuario');
    const usuarios = await db.resultsgetUsuario();
    console.log(usuarios);
  })();