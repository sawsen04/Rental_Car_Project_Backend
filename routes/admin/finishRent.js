const Order = require("../../models/Order");
const Car = require("../../models/Car");
module.exports = async (req, res, next) => {
  try {
    let { orderId } = req.params;

    let order = await Order.findById(orderId);
    Car.findByIdAndUpdate(order.carId, {
      $set: {
        isAvailable: true,
      },
    });
    res.status(200).json({ status: false, message: "ok" });
  } catch (error) {
    if (error) {
      console.log(error);
    }
    res.status(401).json({ status: false, error });
  }
};
