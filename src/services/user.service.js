import db from "../config/db.js";

const getAllUsers = async () => {
  const sql = "SELECT * FROM users";
  const [rows] = await db.query(sql);
  return rows;
};

const getUserById = async (id) => {
  const sql = "SELECT * FROM users WHERE id = ?";
  const [row] = await db.query(sql, [id]);
  return row;
};

const createUser = async (name) => {
  const sql = "INSERT INTO users (name) VALUES (?)";
  const [newData] = await db.query(sql, [name]);
  return { id: newData.insertId, name: name };
};

const updateUser = async (id, name) => {
  const sql = "UPDATE users SET name = ? WHERE id = ?";
  const [results] = await db.query(sql, [name, id]);
  return results.affectedRows;
};

const deleteUser = async (id) => {
  const sql = "DELETE FROM users WHERE id = ?";
  const [del] = await db.query(sql, [id]);
  return del.affectedRows;
};

export { getAllUsers, getUserById, createUser, updateUser, deleteUser };
