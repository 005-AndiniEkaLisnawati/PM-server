import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser,
} from "../services/user.service.js";

const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json({ message: "users found", data: users });
  } catch {
    res.status(500).json({ error: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: `user found`, data: user });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const createNewUser = async (req, res) => {
  try {
    const { name } = req.body;
    const newUser = await createUser(name);
    res.status(201).json({ message: "User created successfully", data: newUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateExistingUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const affectedRows = await updateUser(id, name);
    if (affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", data: { id, name } });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const affectedRows = await deleteUser(id);
        if (affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully", data: { id } });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }};

export { getUsers, getUser, createNewUser, updateExistingUser, deleteUserById };
