const express = require('express');
const { MongoClient } = require('mongodb');
const graphqlHTTP = require('express-graphql');
const graphqlTools = require('graphql-tools')

const app = express();

let db = null;
const url = 'mongodb://localhost:27017';
const dbName = 'graphqldb';
const options = {useNewUrlParser: true, useUnifiedTopology: true};

MongoClient.connect(url, options, (error, client) => {  
    if(error) console.log('Erro de conexão: ', error);
    else console.log('banco de dados conectado com sucesso.');

    db = client.db(dbName);
});

const port = 3000;

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});

function getCode() {
    try {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const milliseconds = date.getMilliseconds();
        const values = year+''+month+''+day+''+hours+''+minutes+''+seconds+''+milliseconds
        const result = Number(parseFloat(Number(values)).toFixed(0))
        return result;
    } catch (error) {
        console.log({erro: error});
        return 0;
    }
}

const typeDEfs = `
    type Pessoa {
        _id: ID,
        codigo: Float,
        nome: String,
        idade: Int,
        email: String
    }

    input inputPessoa {
        codigo: Float,
        nome: String,
        idade: Int,
        email: String
    }

    type Query {
        resposta: String,
        saudacao()
    }
`;