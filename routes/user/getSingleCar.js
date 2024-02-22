const Contact = require("../../models/Car");
module.exports = async (req, res) => {
  try {
    let { carId } = req.params;
    let singleCar = await Car.findById(carId);
    res.status(200).json({ status: true, data: singleCar });
  } catch (error) {
    // if (error) {
    //   console.log(error);
    // }
    res.status(401).json({ status: false, error });
  }
};
