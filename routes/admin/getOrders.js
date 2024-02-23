const Order = require("../../models/Order");
module.exports = async (req, res) => {
  try {
    let orders = await Order.find().populate("userId carId");
    // console.log("ok");
    res.status(200).json({ status: true, data: orders });
  } catch (error) {
    if (error) {
      console.log(error);
    }
    res.status(401).json({ status: false, error });
  }
};
