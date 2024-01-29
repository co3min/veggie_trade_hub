import { database } from "../Database/db.js";
import jwt from "jsonwebtoken";

import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

import bcrypt from "bcryptjs";
import {
  User,
  hashPassword,
  emailValidation,
  validatePassword,
} from "../Models/user.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const privateKeyPath = path.join(__dirname, "../private-key.pem");
const publicKeyPath = path.join(__dirname, "../public-key.pem");

const privateKey = fs.readFileSync(privateKeyPath);
const publicKey = fs.readFileSync(publicKeyPath);

async function createUser(req, res) {
  try {
    const { firstname, lastname, email, password } = req.body;

    const user = new User("", firstname, lastname, email, password);

    const isValidPassoword = validatePassword(user.password);
    if (!isValidPassoword) {
      return res
        .status(400)
        .send(
          "The password must contain at least one small letter, one capital letter, a number and one symbol !"
        );
    }

    const hashedPassword = await hashPassword(user.password);

    user.password = hashedPassword;

    const isValidEmail = emailValidation(email);
    if (!isValidEmail) {
      return res.status(400).send("Email address is invalid !");
    }

    const existingUser = await database
      .collection("Users")
      .where("email", "==", email)
      .get();
    if (!existingUser.empty) {
      return res.status(400).send("Email address already exists !");
    }

    const userRef = await database.collection("Users").add({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
    });
    user.id = userRef.id;

    res.status(201).send("Account created successfully !");
  } catch (error) {
    console.error("Error when add a new user:", error);
    res.status(500).send("Error when add a new user");
  }
}

async function getUserById(userId) {
  try {
    const userDoc = await database.collection("Users").doc(userId).get();

    if (!userDoc.exists) {
      throw new Error("User not found !");
    }

    const userData = userDoc.data();
    return userData;
  } catch (error) {
    console.error("Error when search user information: ", error);
  }
}

async function getUserByEmail(email) {
  try {
    const isValidEmail = emailValidation(email);
    if (!isValidEmail) {
      return;
    }

    const searchedUser = await database
      .collection("Users")
      .where("email", "==", email)
      .get();

    if (searchedUser.empty) {
      return;
    }

    const userData = searchedUser.docs[0].data();

    const user = new User(
      searchedUser.docs[0].id,
      userData.firstname,
      userData.lastname,
      userData.email,
      userData.password
    );

    return user;
  } catch (error) {
    console.error("Error when fetching user by email: ", error);
  }
}

async function login(req, res) {
  try {
    const user = await getUserByEmail(req.body.email);

    if (!user) {
      return res.status(404).send("User not found !");
    }

    if (!(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(400).send("Invalid password !");
    }

    const token = jwt.sign({ id: user.id }, privateKey, { algorithm: "RS256" });

    res.cookie("jwt", token, {
      httpOnly: false,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).send("Success login");
  } catch (error) {
    console.error(error);
    throw new Error("Error to login");
  }
}

async function getUserFromCookie(req, res) {
  try {
    const cookie = req.cookies["jwt"];

    const claims = jwt.verify(cookie, publicKey, { algorithms: ["RS256"] });

    if (!claims) {
      return res.status(401).send("Unauthenticated");
    }

    const user = await getUserById(claims.id);

    const { password, ...data } = user;

    data.id = claims.id;

    console.log(data);

    res.status(200).send(data);
  } catch (error) {
    return res.status(401).send("Unauthenticated");
  }
}

async function updateUser(req, res) {
  try {
    const userId = req.params.userId;

    let { firstname, lastname, email, password } = req.body;

    const userRef = await database.collection("Users").doc(userId).get();

    if (!userRef.exists) {
      return res.status(404).send("User not found !");
    }

    const isValidPassoword = validatePassword(password);
    if (!isValidPassoword) {
      return res
        .status(400)
        .send(
          "The password must contain at least one small letter, one capital letter, a number and one symbol"
        );
    }

    const hashedPassword = await hashPassword(password);

    password = hashedPassword;

    await database.collection("Users").doc(userId).update({
      firstname,
      lastname,
      email,
      password,
    });

    const updatedUserRef = await database.collection("Users").doc(userId).get();
    const updatedUserData = updatedUserRef.data();
    const updatedUser = new User(
      userId,
      updatedUserData.firstname,
      updatedUserData.lastname,
      updatedUserData.email,
      updatedUserData.password
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error when updating user: ", error);
    res.status(500).send("Error when updating user");
  }
}

async function deleteUser(req, res) {
  try {
    const userId = req.params.userId;

    const userRef = await database.collection("Users").doc(userId).get();
    const userData = userRef.data();

    if (!userRef.exists) {
      return res.status(404).send("User not found");
    }

    await database.collection("Users").doc(userId).delete();

    res
      .status(200)
      .send(`${userData.firstname} ${userData.lastname}'s account deleted !`);
  } catch (error) {
    console.error("Error when deleting user account :", error);
    res.status(500).send("Error when deleting user account !");
  }
}

export { createUser, login, getUserFromCookie, updateUser, deleteUser };
