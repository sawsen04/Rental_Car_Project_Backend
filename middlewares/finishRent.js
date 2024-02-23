const Order = require("../models/Order");
const Car = require("../models/Car");
module.exports = async (req, res, next) => {
  try {
    console.log("finish rent middleware");
    // let { carId } = req.params;
    let date = new Date();
    let order = await Order.findOne({
      isPaid: false,
    });
    let orderCreatedDate = date.getTime(order.createdAt);
    let currentDate = date.getTime();
    console.log("time", currentDate - orderCreatedDate >= 120000);
    if (currentDate - orderCreatedDate >= 120000) {
      await Car.findByIdAndUpdate(order.carId, {
        $set: {
          isAvailable: true,
        },
      });
      res.status(200).json({ status: true, message: "Car is available now" });
      next();
    } else {
      res
        .status(200)
        .json({ status: true, message: "Car is not  available now" });
      next();
    }
  } catch (error) {
    if (error) {
      console.log(error);
    }
    res.status(401).json({ status: false, error });
  }
};
