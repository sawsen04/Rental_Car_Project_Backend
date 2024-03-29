const User = require("../../models/User");
module.exports = async (req, res) => {
  try {
    let { id } = req.user;
    let users = await User.find({ _id: { $nin: [id] } }).select(
      "-email -password"
    );
    res.status(200).json({ status: true, data: users });
  } catch (error) {
    if (error) {
      console.log(error);
    }
    res.status(401).json({ status: false, error });
  }
};
