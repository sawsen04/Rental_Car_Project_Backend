const Order = require("../../models/Order");
const Car = require("../../models/Car");
module.exports = async (req, res) => {
  try {
    let { orderId, carId } = req.params;
    // await Order.findByIdAndDelete(orderId);
    await Car.findByIdAndUpdate(carId, {
      $set: {
        isAvailable: true,
      },
    });
    await Order.findByIdAndUpdate(orderId, {
      $set: {
        isFinished: true,
      },
    });
    res.status(200).json({ status: true, message: "ok" });
  } catch (error) {
    if (error) {
      console.log(error);
    }
    res.status(401).json({ status: false, error });
  }
};
