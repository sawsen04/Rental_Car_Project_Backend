const Car = require("../../models/Car");
module.exports = async (req, res) => {
  try {
    let { carId } = req.params;
    await Car.findByIdAndUpdate(carId, {
      $set: {
        ...req.body,
      },
    });
    res
      .status(200)
      .json({ status: true, message: "car was updates successfully" });
  } catch (error) {
    if (error) {
      console.log(error);
    }
    res.status(401).json({ status: false, error });
  }
};
