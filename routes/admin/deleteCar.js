const Car = require("../../models/Car");
module.exports = async (req, res) => {
  try {
    let { carId } = req.params;
    await Car.findByIdAndDelete(carId);
    res
      .status(200)
      .json({ status: true, message: "car was deleted successfully" });
  } catch (error) {
    if (error) {
      console.log(error);
    }
    res.status(401).json({ status: false, error });
  }
};
