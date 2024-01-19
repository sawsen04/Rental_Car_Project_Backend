const Order = require("../../models/Order");
module.exports = async (req, res) => {
  try {
    let { orderId } = req.params;
    let singleOrder = await Order.findById(orderId);
    res.status(200).json({ status: true, data: singleOrder});
  } catch (error) {
    if (error) {
      console.log(error);
    }
    res.status(401).json({ status: false, error });
  }
};
