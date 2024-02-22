const User = require("../../models/User");
const cloudinary = require("../../middlewares/cloudinary");
const fs = require("fs");
module.exports = async (req, res) => {
  try {
    let { userId } = req.params;
    const uploader = async (path) => await cloudinary.uploads(path, "uploads");
    let { path } = req.file;
    const { url } = await uploader(path);
    fs.unlinkSync(path);
    // let imageUrl = `${req.protocol}://${req.headers.host}/uploads/${req.file.filename}`;
    await User.findByIdAndUpdate(userId, {
      $set: {
        imageUrl: url,
      },
    });
    res
      .status(200)
      .json({ status: true, message: "user photo was updates successfully" });
  } catch (error) {
    // if (error) {
    //   console.log(error);
    // }
    res.status(401).json({ status: false, error });
  }
};
