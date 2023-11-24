import express from "express";
import { getUser, createUser, login, getIndividualUser, editUser, editUserHistoryStatus } from "../controllers/User.js";

const router = express.Router();

router.get("/", getUser);
router.get("/:id", getIndividualUser);
router.post("/new", createUser);
router.post("/login", login);
router.patch("/edit/:id", editUser);
router.patch("/edit-bike-status/:id", editUserHistoryStatus);

export default router;
