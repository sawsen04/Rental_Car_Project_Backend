const Car = require("../../models/Car");
const cloudinary = require("../../middlewares/cloudinary");
const fs = require("fs");
module.exports = async (req, res) => {
  try {
    let { carId } = req.params;
    const uploader = async (path) => await cloudinary.uploads(path, "photo car updated");
    let urls = [];
    for (let i = 0; i < req.files.length; i++) {
      let result = await uploader(req.files[i].path);
      urls.push(result.url);
      fs.unlinkSync(req.files[i].path);
    }
    await Car.findByIdAndUpdate(carId, {
      $set: {
        imageUrl: urls,
      },
    });
    res
      .status(200)
      .json({ status: true, message: "car photos were updates successfully" });
  } catch (error) {
    if (error) {
      console.log(error);
    }
    res.status(401).json({ status: false, error });
  }
};
