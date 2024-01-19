const User = require("../../models/User");
const Car = require("../../models/Car");
module.exports = async (req, res) => {
  try {
    let { id } = req.user;
    await User.findByIdAndDelete(id);
    await Car.deleteMany({ userId: id });
    res
      .status(200)
      .json({ status: true, message: "user was deleted successfully" });
  } catch (error) {
    if (error) {
      console.log(error);
    }
    res.status(401).json({ status: false, error });
  }
};
