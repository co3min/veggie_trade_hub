import { database } from "../Database/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {
  User,
  hashPassword,
  emailValidation,
  validatePassword,
} from "../Models/user.js";

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

// async function getUserById(req, res) {
//   try {
//     const userId = req.params.userId;

//     const userDoc = await database.collection("Users").doc(userId).get();

//     if (!userDoc.exists) {
//       return res.status(404).send("User not found !");
//     }

//     const userData = userDoc.data();
//     res.status(200).json(userData);
//   } catch (error) {
//     console.error("Error when search user information: ", error);
//     res.status(500).send("Error when search user information");
//   }
// }

// async function getUserByEmail(req, res) {
//   try {
//     const email = req.query.email;

//     if (!email) {
//       return res.status(400).send("Email parameter is missing !");
//     }

//     const isValidEmail = emailValidation(email);
//     if (!isValidEmail) {
//       return res.status(400).send("Email address is invalid !");
//     }

//     const searchedUser = await database
//       .collection("Users")
//       .where("email", "==", email)
//       .get();

//     if (searchedUser.empty) {
//       return res.status(404).send("User not found !");
//     }

//     const userData = searchedUser.docs[0].data();

//     const user = new User(
//       searchedUser.docs[0].id,
//       userData.firstname,
//       userData.lastname,
//       userData.email,
//       userData.password
//     );

//     res.status(200).send(user);
//   } catch (error) {
//     console.error("Error when fetching user by email: ", error);
//     res.status(500).send("Error when fetching user by email");
//   }
// }

async function getUserById(userId) {
  try {
    const userDoc = await database.collection("Users").doc(userId).get();

    if (!userDoc.exists) {
      throw new Error("User not found !");
    }

    const userData = userDoc.data();
    res.status(200).json(userData);
  } catch (error) {
    console.error("Error when search user information: ", error);
    res.status(500).send("Error when search user information");
  }
}

async function getUserByEmail(email) {
  try {
    const isValidEmail = emailValidation(email);
    if (!isValidEmail) {
      // throw new Error("Email address is invalid!");
      return;
    }

    const searchedUser = await database
      .collection("Users")
      .where("email", "==", email)
      .get();

    if (searchedUser.empty) {
      // throw new Error("User not found!");
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

    const token = jwt.sign({ id: user.id }, "secret");

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).send("success");
  } catch (error) {
    console.error(error);
    throw new Error("Error to login");
  }
}

async function getUserFromCookie(req, res) {
  try {
    const cookie = req.cookies["jwt"];

    const claims = jwt.verify(cookie, "secret");

    if (!claims) {
      return res.status(401).send("Unauthenticated");
    }

    const user = await getUserById(claims.id);

    const { password, ...data } = await user.toJSON();

    res.status(200).send(data);
  } catch (error) {
    return res.status(401).send("Unauthenticated");
  }
}

async function logout(req, res) {
  res.cookies("jwt", "", { maxAge: 0 });
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

export { createUser, login, logout, getUserFromCookie, updateUser, deleteUser };
