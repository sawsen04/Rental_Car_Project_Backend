const Order = require("../../models/Order");
const Car = require("../../models/Car");
module.exports = async (req, res) => {
  try {
    let { carId } = req.params;
    // await Order.findByIdAndDelete(orderId);
    let update = await Car.findByIdAndUpdate(carId, {
      $set: {
        isAvailable: true,
        isFinished: true,
      },
    });
    res.status(200).json({ status: true, message: update });
  } catch (error) {
    if (error) {
      console.log(error);
    }
    res.status(401).json({ status: false, error });
  }
};
