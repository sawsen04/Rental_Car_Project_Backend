const User = require("../../models/User");
module.exports = async (req, res) => {
  try {
    let users = await User.find().select("-email -password");
    res.status(200).json({ status: true, data: users });
  } catch (error) {
    if (error) {
      console.log(error);
    }
    res.status(401).json({ status: false, error });
  }
};
