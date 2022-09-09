const mysql = require("mysql2/promise");

const createDbConnection = async () =>
  await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_DATABASE,
  });

const sqlInsert = async (table, data) => {
  const db = await createDbConnection();

  const columns = Object.keys(data);
  const values = Object.values(data);
  const sqlString = `INSERT INTO ${table} (${columns.join(
    ","
  )}) VALUES (${values.map((val) => "?").join(",")})`;

  try {
    return await db.query(sqlString, values);
  } catch (err) {
    return err;
  }
};

module.exports = { sqlInsert };
