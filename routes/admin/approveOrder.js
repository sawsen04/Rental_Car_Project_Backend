const Order = require("../../models/Order");
const Car = require("../../models/Car");
module.exports = async (req, res) => {
  try {
    let { orderId, carId } = req.params;
    await Order.findByIdAndUpdate(orderId, {
      $set: {
        isPaid: true,
      },
    });
    await Car.findByIdAndUpdate(carId, {
      $set: {
        isAvailable: false,
      },
    });
    res
      .status(200)
      .json({ status: true, message: "order approved successfully" });
  } catch (error) {
    if (error) {
      console.log(error);
    }
    res.status(401).json({ status: false, error });
  }
};
