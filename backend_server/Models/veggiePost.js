export class VeggiePost {
  constructor(
    id,
    title,
    description,
    price,
    stock,
    unit,
    location,
    images,
    userID
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
    this.stock = stock;
    this.unit = unit;
    this.location = location;
    this.images = images;
    this.userID = userID;
  }
}
