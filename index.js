const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());


const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run("CREATE TABLE cats (id INT, name TEXT, votes INT)");
  db.run("CREATE TABLE dogs (id INT, name TEXT, votes INT)");
});

app.post('/cats', (req, res) => {
  const name = req.body.name;
  db.run(`INSERT INTO cats (name, votes) VALUES ('${name}', 0)`, function(err) {
    if (err) {
      res.status(500).send("Erro ao inserir no banco de dados");
    } else {
      res.status(201).json({ id: this.lastID, name, votes: 0 });
    }
  });
});

app.post('/dogs', (req, res) => {
  const name = req.body.name;
  db.run(`INSERT INTO dogs (name, votes) VALUES ('${name}', 0)`, function(err){
    if (err){
      res.status(500).send("Erro ao inserir no banco de dados");
    } else {
      res.status(201).json({ id: this.lastID, name, votes: 0 });
    }
  });
});

app.post('/vote/:animalType/:id', (req, res) => {
  const animalType = req.params.animalType;
  const id = req.params.id;

  if (!(animalType === 'cats' || animalType === 'dogs') || isNaN(parseInt(id))) {
    res.status(400).send("Parâmetros inválidos");
    return;
  }

  db.get(`SELECT * FROM ${animalType} WHERE id = ?`, [id], (err, row) => {
    if (err) {
      res.status(500).send("Erro ao verificar o registro de voto");
    } else if (!row) {
      res.status(404).send("Registro de voto não encontrado");
    } else { 
    db.run(`UPDATE ${animalType} SET votes = votes + 1 WHERE id = ${id}`, function(err){
    if (err){
      res.status(500).send("Erro ao atualizar votos");
    } else {
      res.status(200).send("Voto computado");
    }
  });
}
  });
});

app.get('/cats', (req, res) => {
  db.all("SELECT * FROM cats", [], (err, rows) => {
    if (err) {
      res.status(500).send("Erro ao consultar o banco de dados");
    } else {
      res.json(rows);
    }
  });
});

app.get('/dogs', (req, res) => {
  db.all("SELECT * FROM dogs", [], (err, rows) => {
    if (err) {
      res.status(500).send("Erro ao consultar o banco de dados");
    } else {
      res.json(rows);
    }
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Ocorreu um erro!');
});

app.listen(port, () => {
  console.log(`Cats and Dogs Vote app listening at http://localhost:${port}`);
});