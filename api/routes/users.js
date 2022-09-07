import express from "express";
import { createUser, deleteUser, getUser, getUsers, updateUser } from "../controllers/users.js";
import User from "../models/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/checkauth", verifyToken, (req, res, next) => {
    res.send("You're logged in");
});
router.get("/checkuser/:id", verifyUser, (req, res, next) => {
    res.send("You're authorized");
});
router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
    res.send("You're admin");
});

router.post("/", createUser);

router.put("/:id", verifyUser, updateUser);

router.delete("/:id", verifyUser, deleteUser);

router.get("/:id", getUser);

router.get("/", verifyAdmin, getUsers);

export default router;