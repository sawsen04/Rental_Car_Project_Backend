const Order = require("../../models/Order");
module.exports = async (req, res) => {
  try {
    let orders = await Order.find();
    res.status(200).json({ status: true, data: orders }).populate("userId");
  } catch (error) {
    if (error) {
      console.log(error);
    }
    res.status(401).json({ status: false, error });
  }
};
