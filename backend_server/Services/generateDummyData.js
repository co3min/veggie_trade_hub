import faker from "faker";
import { database } from "../Database/db.js";

async function generateDummyData(numPosts) {
  try {
    const usersFromDB = [];
    const usersSnapshot = await database.collection("Users").get();

    usersSnapshot.forEach((doc) => {
      const userId = doc.id;
      usersFromDB.push(userId);
    });

    const vegetables = [
      "carrot",
      "potato",
      "tomato",
      "broccoli",
      "cucumber",
      "spinach",
      "bell pepper",
      "zucchini",
      "eggplant",
      "celery",
      "onion",
      "lettuce",
      "cabbage",
      "mushroom",
      "pea",
    ];

    const vegetableUnits = ["kg", "bunch", "piece", "head"];

    const actions = ["Buy", "Sell"];

    for (let i = 0; i < numPosts; i++) {
      let title = `${faker.random.arrayElement(
        actions
      )} ${faker.random.arrayElement(vegetables)}`;

      const veggie = {
        title: title,
        description: faker.lorem.sentence(),
        price: faker.commerce.price(),
        stock: faker.datatype.number(),
        unit: faker.random.arrayElement(vegetableUnits),
        location: faker.address.city(),
        phoneNo: faker.phone.phoneNumber(),
        images: [faker.image.food()],
        userID: faker.random.arrayElement(usersFromDB),
      };

      await database.collection("VeggiePosts").add(veggie);
    }

    console.log(`${numPosts} dummy veggie posts inserted successfully.`);
  } catch (error) {
    console.error("Error generating dummy data:", error);
  }
}

generateDummyData(10);
