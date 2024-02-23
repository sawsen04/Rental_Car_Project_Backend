const Order = require("../models/Order");
const Car = require("../models/Car");
module.exports = async (req, res, next) => {
  try {
    console.log("finish rent middleware");
    // let { carId } = req.params;
    let date = new Date();
    let orders = await Order.find();
    let currentDate = date.getTime();
    orders.forEach((order) => {
      let orderCreatedDate = date.getTime(order.createdAt);
      console.log("time", currentDate - orderCreatedDate >= 120000);
      if (currentDate - orderCreatedDate >= 120000) {
        Car.findByIdAndUpdate(order.carId, {
          $set: {
            isAvailable: true,
          },
        });

        next();
      } else {
        next();
      }
    });
  } catch (error) {
    if (error) {
      console.log(error);
    }
    res.status(401).json({ status: false, error });
  }
};
