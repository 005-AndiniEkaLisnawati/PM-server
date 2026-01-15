import express from "express";
import mysql from "mysql2/promise";

const db = await mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_belajar",
});

const app = express();
const port = 3000;
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello Kambing!");
});

app.get("/users", async (req, res) => {
  try {
    if (!db) {
      throw new Error("Database connection not established");
    }

    const sql = "SELECT * FROM users";

    const [rows] = await db.query(sql);

    if (rows.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const sql = "SELECT * FROM users WHERE id = ?";
    const [row] = await db.query(sql, [id]);
    if (row.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: `user found`, data: row });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

app.post("/users", async (req, res) => {
  try {
    const { name } = req.body;
    const sql = "INSERT INTO users (name) VALUES (?)";
    const [newData] = await db.query(sql, [name]);
    res.status(201).json({ id: newData.insertId, name: name });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const sql = "UPDATE users SET name = ? WHERE id = ?";
    const [results] = await db.query(sql, [name, id]);
    res.status(202).json({ message: `User with id ${id} updated`, results });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const sql = "DELETE FROM users WHERE id = ?";
    const [del] = await db.query(sql, [id]);

    res.status(200).json({ message: `User with id ${id}` });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
