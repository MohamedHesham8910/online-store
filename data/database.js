const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const client = new MongoClient('mongodb://localhost:27017');

let database;

async function connectToDatabase () {
    await client.connect();
    database = client.db('online-shop');
}

function getDB() {
    if(!database){
        throw new Error('You Must Connect First');
    }

    return database;
}

module.exports = {
    connectToDatabase: connectToDatabase,
    getDB: getDB
}