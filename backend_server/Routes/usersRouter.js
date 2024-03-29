import express from "express";
import * as usersService from "../Services/usersService.js";

const router = express.Router();

router.post("/newUser", usersService.createUser);

router.post("/login", usersService.login);

router.get("/user", usersService.getUserFromCookie);

router.put("/users/update/:userId", usersService.updateUser);

router.delete("/users/delete/:userId", usersService.deleteUser);

export { router as usersRouter };
