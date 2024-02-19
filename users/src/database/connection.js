const Sequelize = require('sequelize');
const userModel = require('./models/user')
require('dotenv').config();

const DB_CONFIG = {
    database: process.env.DB_NAME,
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: 'mysql'
}

let sequelize = new Sequelize(
    DB_CONFIG.database,
    DB_CONFIG.username,
    DB_CONFIG.password,
    {
        host: DB_CONFIG.host,
        dialect:DB_CONFIG.dialect
    });

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });

 userModel(sequelize, Sequelize); 
 const db = {};
 db.Sequelize = Sequelize;
 db.sequelize = sequelize;
 db.User = sequelize.models.User;
 
 
 module.exports = db;
 