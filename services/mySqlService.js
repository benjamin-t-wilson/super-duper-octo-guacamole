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
    const result = await db.query(sqlString, values);
    await db.end();
    return result;
  } catch (err) {
    await db.end();
    return err;
  }
};

const sqlSelect = async (table, condition) => {
  const db = await createDbConnection();

  let sqlString = `SELECT * FROM ${table}`;

  if (condition) {
    sqlString += ` WHERE ${condition};`;
  }

  try {
    const result = await db.query(sqlString);
    await db.end();
    return result;
  } catch (err) {
    await db.end();
    return err;
  }
};

const sqlDelete = async (table, condition) => {
    const db = await createDbConnection();

  let sqlString = `DELETE FROM ${table} WHERE ${condition}`;

  try {
    const result = await db.query(sqlString);
    await db.end();
    return result;
  } catch (err) {
    await db.end();
    return err;
  }
}

module.exports = { sqlInsert, sqlSelect, sqlDelete, createDbConnection };
