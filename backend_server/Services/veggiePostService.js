import { query } from "express";
import { database } from "../Database/db.js";
import { VeggiePost } from "../Models/veggiePost.js";
import fs from "fs";

async function verifyUserExist(userId) {
  const userDoc = await database.collection("Users").doc(userId).get();

  if (!userDoc.exists) {
    return false;
  }

  return true;
}

async function createVeggiePost(req, res) {
  try {
    const { title, description, price, stock, unit, location, images, userID } =
      req.body;

    if (price <= 0) {
      return res.status(400).send("Price cannot be zero or equal to zero !");
    }

    if (stock <= 0) {
      return res.status(400).send("Stock cannot be zero or equal to zero !");
    }

    const existUser = await verifyUserExist(userID);
    if (!existUser) {
      return res.status(404).send("User not found !");
    }

    const veggie = new VeggiePost(
      "",
      title,
      description,
      price,
      stock,
      unit,
      location,
      images,
      userID
    );

    const veggieRef = await database.collection("VeggiePosts").add({
      title: veggie.title,
      description: veggie.description,
      price: veggie.price,
      stock: veggie.stock,
      unit: veggie.unit,
      location: veggie.location,
      images: veggie.images,
      userID: veggie.userID,
    });

    veggie.id = veggieRef.id;

    res.status(201).json(veggie);
  } catch (error) {
    console.error("Error when creating veggie post !", error);
    return res.status(500).send("Error when creating veggie post !");
  }
}

async function getVeggiePostById(req, res) {
  try {
    const veggieId = req.params.veggieId;

    const veggieDoc = await database
      .collection("VeggiePosts")
      .doc(veggieId)
      .get();

    if (!veggieDoc.exists) {
      return res.status(404).send("VeggiePost not found !");
    }

    const veggieData = veggieDoc.data();

    res.status(200).json(veggieData);
  } catch (error) {
    console.error("Error when get veggiePost by id: ", error);
    res.status(500).send("Error when get veggiePost by id !");
  }
}

async function getVeggiePostByUserID(req, res) {
  try {
    const userID = req.query.userID;

    if (!userID) {
      return res.status(400).send("UserID parameter is missing !");
    }

    const existUser = await verifyUserExist(userID);
    if (!existUser) {
      return res.status(404).send("User not found !");
    }

    const resultVeggiePosts = [];
    await database
      .collection("VeggiePosts")
      .where("userID", "==", userID)
      .get()
      .then((queryVeggiePosts) => {
        if (!queryVeggiePosts.empty) {
          queryVeggiePosts.forEach((doc) => {
            const data = doc.data();
            const veggiePost = new VeggiePost(
              doc.id,
              data.title,
              data.description,
              data.price,
              data.stock,
              data.unit,
              data.location,
              data.images,
              data.userID
            );
            resultVeggiePosts.push(veggiePost);
          });
        }
      });

    res.status(200).json(resultVeggiePosts);
  } catch (error) {
    console.error("Error when fetching veggie posts by user id !", error);
    res.status(500).send("Error when fetching veggie posts by user id !");
  }
}

async function updateVeggiePost(req, res) {
  try {
    const veggieId = req.params.veggieId;

    const veggieDoc = await database
      .collection("VeggiePosts")
      .doc(veggieId)
      .get();

    if (!veggieDoc.exists) {
      return res.status(404).send("VeggiePost not found !");
    }

    let { title, description, price, stock, unit, location, images, userID } =
      req.body;

    if (price <= 0) {
      return res.status(400).send("Price cannot be zero or equal to zero !");
    }

    if (stock <= 0) {
      return res.status(400).send("Stock cannot be zero or equal to zero !");
    }

    const existUser = await verifyUserExist(userID);
    if (!existUser) {
      return res.status(404).send("User not found !");
    }

    await database.collection("VeggiePosts").doc(veggieId).update({
      title,
      description,
      price,
      stock,
      unit,
      location,
      images,
      userID,
    });

    const updatedVeggiePostDoc = await database
      .collection("VeggiePosts")
      .doc(veggieId)
      .get();
    const updatedVeggiePostData = updatedVeggiePostDoc.data();
    const updatedVeggiePost = new VeggiePost(
      veggieId,
      updatedVeggiePostData.title,
      updatedVeggiePostData.description,
      updatedVeggiePostData.price,
      updatedVeggiePostData.stock,
      updatedVeggiePostData.unit,
      updatedVeggiePostData.location,
      updatedVeggiePostData.images,
      updatedVeggiePostData.userID
    );

    res.status(200).json(updatedVeggiePost);
  } catch (error) {
    console.error("Error when updating veggiePost: ", error);
    res.status(500).send("Error when updating veggiePost !");
  }
}

async function deleteVeggiePost(req, res) {
  try {
    const veggieId = req.params.veggieId;

    const veggieDoc = await database
      .collection("VeggiePosts")
      .doc(veggieId)
      .get();

    if (!veggieDoc.exists) {
      return res.status(404).send("VeggiePost not found !");
    }

    await database.collection("VeggiePosts").doc(veggieId).delete();

    const veggieData = veggieDoc.data();

    if (veggieData.images && veggieData.images.length > 0) {
      veggieData.images.forEach((image) => {
        const imageUrl = image.url;
        const filename = imageUrl.split("/").pop();
        const filePath = `uploads/${filename}`;

        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log(`Deleted image: ${filePath}`);
        } else {
          console.log(`Image not found: ${filePath}`);
        }
      });
    }

    res.status(200).send(`VeggiePost ${veggieData.title} deleted !`);
  } catch (error) {
    console.error("Error when deleting veggie post: ", error);
    res.status(500).send("Error when deleting veggie post !");
  }
}

async function uploadImage(req, res) {
  const uploadedFiles = req.files.map((file) => {
    return {
      url: `http://localhost:5001/uploads/${file.filename}`,
    };
  });

  res.json(uploadedFiles);
}

async function getAllVeggiePosts(req, res) {
  try {
    const resultVeggiePosts = [];
    await database
      .collection("VeggiePosts")
      .get()
      .then((queryVeggiePosts) => {
        if (!queryVeggiePosts.empty) {
          queryVeggiePosts.forEach((doc) => {
            const data = doc.data();
            const veggiePost = new VeggiePost(
              doc.id,
              data.title,
              data.description,
              data.price,
              data.stock,
              data.unit,
              data.location,
              data.images,
              data.userID
            );
            resultVeggiePosts.push(veggiePost);
          });
        }
      });

    res.status(200).json(resultVeggiePosts);
  } catch (error) {
    console.error("Error when fetching veggie posts by user id !", error);
    res.status(500).send("Error when fetching veggie posts by user id !");
  }
}

export {
  createVeggiePost,
  getVeggiePostById,
  getVeggiePostByUserID,
  updateVeggiePost,
  deleteVeggiePost,
  getAllVeggiePosts,
  uploadImage,
};
