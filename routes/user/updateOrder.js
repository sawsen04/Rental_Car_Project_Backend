const Order = require("../../models/Order");
module.exports = async (req, res) => {
  try {
    let { orderId } = req.params;
    await Order.findByIdAndUpdate(orderId, {
      $set: {
        ...req.body,
      },
    });
    res
      .status(200)
      .json({ status: true, message: "order was updated successfully" });
  } catch (error) {
    // if (error) {
    //   console.log(error);
    // }
    res.status(401).json({ status: false, error });
  }
};
