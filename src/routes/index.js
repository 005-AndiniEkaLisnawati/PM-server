import UserRouter from "./user.route.js";
import { Router } from "express";
const router = Router();

router.use("/users", UserRouter)

export default router;
