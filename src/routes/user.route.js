import {Router} from "express";
import { getUsers, createNewUser, updateExistingUser, deleteUserById, getUser } from "../controllers/user.controller.js";
const router = Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", createNewUser);
router.put("/:id", updateExistingUser);
router.delete("/:id", deleteUserById);

export default router;


