const User = require("../../models/User");
module.exports = async (req, res) => {
  try {
    let { userId } = req.params;
    await User.findByIdAndUpdate(userId, {
      $set: {
        ...req.body,
      },
    });
    res
      .status(200)
      .json({ status: true, message: "user infos were updates successfully" });
  } catch (error) {
    // if (error) {
    //   console.log(error);
    // }
    res.status(401).json({ status: false, error });
  }
};
