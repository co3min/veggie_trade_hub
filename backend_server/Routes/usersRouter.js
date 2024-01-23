import express from "express";
import * as usersService from "../Services/usersService.js";

const router = express.Router();

router.post("/newUser", usersService.createUser);

// router.get("/users/:userId", usersService.getUserById);

// router.get("/userByEmail", usersService.getUserByEmail);

router.post("/login", usersService.login);

router.get("/logout", usersService.logout);

router.get("/user", usersService.getUserFromCookie);

router.put("/users/update/:userId", usersService.updateUser);

router.delete("/users/delete/:userId", usersService.deleteUser);

export { router as usersRouter };
