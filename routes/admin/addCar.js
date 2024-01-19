const Car = require("../../models/Car");
const cloudinary = require("../../middlewares/cloudinary");
const fs = require("fs");
module.exports = async (req, res) => {
  try {
    let {
      brand,
      model,
      year,
      mileage,
      gearBox,
      pricePerDay,
      fuel,
      description,
    } = req.body;
    const uploader = async (path) => await cloudinary.uploads(path, "uploads");
    let urls = [];
    for (let i = 0; i < req.files.length; i++) {
      let result = await uploader(req.files[i].path);
      urls.push(result.url);
      fs.unlinkSync(req.files[i].path);
    }
    let newCar = await new Car({
      brand,
      model,
      year,
      description,
      mileage,
      imageUrl: urls,
      gearBox,
      pricePerDay,
      fuel,
    });
    await newCar.save();
    res.status(200).json({ status: true, message: "car added successfully" });
  } catch (error) {
    res.status(401).json({ status: false, error });
  }
};
