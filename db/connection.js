const pg = require("pg");
const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  password: "postgres",
  host: "localhost",
  port: 5432,
  database: "DIYPlatform",
  idleTimeoutMillis: 500,
});

// async function run() {
//   const result = await pool.query("SELECT NOW()");
//   const rows = result.rows[0].now;
//   console.log(`TEST DULU`);
//   console.log(rows);
// }
// run();

module.exports = pool;
