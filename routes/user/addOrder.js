const Order = require("../../models/Order");
const cloudinary = require("../../middlewares/cloudinary");
const fs = require("fs");
module.exports = async (req, res) => {
  try {
    let { pickUpDay, returnDay, ammount } = req.body;
    let { id } = req.user;
    let { carId } = req.params;
    // console.log("carId", carId);
    const uploader = async (path) => await cloudinary.uploads(path, "uploads");
    let urls = [];
    for (let i = 0; i < req.files.length; i++) {
      let result = await uploader(req.files[i].path);
      urls.push(result.url);
      fs.unlinkSync(req.files[i].path);
    }
    let newOrder = await new Order({
      drivingLicense: urls,
      pickUpDay,
      returnDay,
      ammount,
      userId: id,
      carId,
    });
    await newOrder.save();
    res.status(200).json({ status: true, message: "order added successfully" });
  } catch (error) {
    res.status(401).json({ status: false, error });
  }
};
