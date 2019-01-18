const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex')

const database = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'ivojurisic',
      password : '',
      database : 'joes-coffee-store'
    }
  });

const app = express();
app.use(cors());
app.use(bodyParser.json());

database.select('*').from('products').then(data => {
    app.get('/', (req, res) => { 
        res.send(data);
    });
});


app.listen(3001);