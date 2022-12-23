const expressSession = require('express-session');
const MongoDbStore = require('connect-mongodb-session')(expressSession);

function createSessionStore(){
  const mongoStore = new MongoDbStore({
    uri: 'mongodb://localhost:27017',
    databaseName: 'online-shop',
    collection: 'sessions'
});
    return mongoStore;
}

function createSessionConfig(){
    return{
        secret: 'very secret',
        resave: false,
        saveUninitialized: false,
        store: createSessionStore(),
        cookie: {maxAge: 1000 * 60 * 60 * 24 * 2}
    }
}

module.exports = createSessionConfig;

