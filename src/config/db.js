import mysql from "mysql2/promise";

const db = await mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_belajar",
});

export default db;