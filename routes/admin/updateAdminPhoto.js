const Admin = require("../../models/Admin");
const cloudinary = require("../../middlewares/cloudinary");
const fs = require("fs");
module.exports = async (req, res) => {
  try {
    let { adminId } = req.params;
    const uploader = async (path) => await cloudinary.uploads(path, "uploads");
    let { path } = req.file;
    const { url } = await uploader(path);
    fs.unlinkSync(path);
    // let imageUrl = `${req.protocol}://${req.headers.host}/uploads/${req.file.filename}`;
    await Admin.findByIdAndUpdate(adminId, {
      $set: {
        imageUrl: url,
      },
    });
    res
      .status(200)
      .json({ status: true, message: "admin photo was updates successfully" });
  } catch (error) {
    if (error) {
      console.log(error);
    }
    res.status(401).json({ status: false, error });
  }
};
