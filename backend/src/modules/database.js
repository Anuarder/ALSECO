const configs = require(`./../config/config`);
const { promisify } = require('util');
const mysql = require('mysql');

const database = mysql.createPool(configs.database);

database.query = promisify(database.query);

module.exports = database;