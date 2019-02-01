const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const fs = require('fs');
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
        // console.log(res);
        // console.log(data);
        res.send(data);
        // const properFormatData = data;
        const fileLocation = '../joes-coffee-store/src/Products/productsContent.js';
        // const fileLocation = '../joes-coffee-store/src/Products/fetchProducts.js';
        const properFormatData = JSON.stringify(data);
        // const productsContentData =  `export const fetchContent = ${properFormatData};`;
        const productsContentData = `export const productsContent = ${properFormatData};`;
        // res.send(JSON.stringify(data));
        fs.writeFile(fileLocation, productsContentData, 'utf-8');
        /* fs.readFile(fileLocation, function (err, data) {
            if(err) return console.log(err);
           const idReplace = data.replace(`{"id":`, `id:`);
           fs.writeFile(fileLocation, idReplace);
           console.log(idReplace);
        }); */
    });
});


app.listen(3001);