const Car = require("../../models/Car");
module.exports = async (req, res) => {
  try {
    let car = await Car.find();
    res.status(200).json({ status: true, data: car });
  } catch (error) {
    // if (error) {
    //   console.log(error);
    // }
    res.status(401).json({ status: false, error });
  }
};
