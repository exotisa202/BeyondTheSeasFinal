const { Pool } = require('pg');
// pg reads PGHOST, PGPORT, PGDATABASE, PGUSER and PGPASSWORD.
const pool = new Pool(process.env.DATABASE_URL ? { connectionString: process.env.DATABASE_URL } : {});
module.exports = { query: (text, params) => pool.query(text, params) };
