const Order = require("../models/Order");
const Car = require("../models/Car");
module.exports = async (req, res) => {
  try {
    console.log("finish rent middleware");
    let { carId } = req.params;
    let date = new Date();
    let order = await Order.findOne({
      carId,
    });
    let orderCreatedDate = date.getTime(order.createdAt);
    let currentDate = date.getTime();
    if (currentDate - orderCreatedDate >= 120000) {
      await Car.findByIdAndUpdate(carId, {
        $set: {
          isAvailable: true,
        },
      });
      return res
        .status(200)
        .json({ status: true, message: "Car is available now" });
    } else {
      return res
        .status(200)
        .json({ status: true, message: "Car is not  available now" });
    }
  } catch (error) {
    if (error) {
      console.log(error);
    }
    res.status(401).json({ status: false, error });
  }
};
