const pgp = require('pg-promise')();

const cn = {
  host: 'localhost',
  port: 5432,
  database: 'asoiaf_categories'
};

const db = pgp(cn);

module.exports = db;