require('dotenv').config();

//Config DB
const host = process.env.DB_HOST;
const username = process.env.DB_USER || 'root';
const database = process.env.DB_NAME;
const password = process.env.DB_PASS;
const dialect = process.env.DB_TYPE;
const logging = false;

//Config seeds
const seederStorage = 'sequelize';
const seederStorageTableName = 'seeds';

//Config migrations
const migrationStorage = 'sequelize';
const migrationStorageTableName = 'migrations';


module.exports = {
    host,
    username,
    database,
    password,
    dialect,
    logging,
    seederStorage,
    seederStorageTableName,
    migrationStorage,
    migrationStorageTableName
}