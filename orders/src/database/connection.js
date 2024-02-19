const Sequelize = require('sequelize');
const userModel = require('./models/user')
const productModel = require('./models/products')
const invoiceModel = require('./models/invoice')
const transactionModel = require('./models/transaction');

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
 productModel(sequelize, Sequelize);
 invoiceModel(sequelize, Sequelize);
 transactionModel(sequelize, Sequelize);

 const models = sequelize.models;

 models.User.hasMany(models.Product,{
    foreignKey: 'userId',
    as: 'seller'
 })

 models.Product.belongsTo(models.User,{
    foreignKey: 'userId',
    as: 'seller'
 })

 models.User.hasMany(models.Invoice,{
    foreignKey: 'userId',
    as: 'buyer'
 })

 models.Invoice.belongsTo(models.User,{
    foreignKey: 'userId',
    as: 'buyer'
 })

 models.Product.hasMany(models.Transaction,{
    foreignKey: 'productId'
 })

 models.Transaction.belongsTo(models.Product,{
    foreignKey: 'productId'
 })

 models.Invoice.hasMany(models.Transaction,{
    foreignKey: 'invoiceId'
 })

 models.Transaction.belongsTo(models.Invoice,{
    foreignKey: 'invoiceId'
 });

 const db = {};
 db.Sequelize = Sequelize;
 db.sequelize = sequelize;
 db.User = sequelize.models.User;
 db.Product = sequelize.models.Product;
 db.Invoice = sequelize.models.Invoice;
 db.Transaction = sequelize.models.Transaction;
 
 
 module.exports = db;
 