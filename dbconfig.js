const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.HEROKU_POSTGRESQL_AQUA_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
module.exports = pool;
