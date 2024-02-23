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
    res.status(200).json({ status: true, message: "Car is available now" });
  } catch (error) {
    if (error) {
      console.log(error);
    }
    res.status(401).json({ status: false, error });
  }
};
