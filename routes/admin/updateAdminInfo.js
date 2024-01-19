const Admin = require("../../models/Admin");
module.exports = async (req, res) => {
  try {
    let { adminId } = req.params;
    await Admin.findByIdAndUpdate(adminId, {
      $set: {
        ...req.body,
      },
    });
    res
      .status(200)
      .json({ status: true, message: "admin infos were updates successfully" });
  } catch (error) {
    if (error) {
      console.log(error);
    }
    res.status(401).json({ status: false, error });
  }
};
