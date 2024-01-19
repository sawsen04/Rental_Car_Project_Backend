constAdmin = require("../../models/Admin");
const bcrypt = require("bcrypt");
module.exports = async (req, res) => {
  try {
    let { adminName, email, password } = req.body;
    let existedAdmin = await Admin.findOne({ email });
    let existedadminName = await Admin.findOne({ adminName });
    if (existedAdmin) {
      return res.status(401).json({
        status: true,
        message: "this email is already existed, please try another one",
      });
    }
    if (existedadminName) {
      return res.status(401).json({
        status: true,
        message: "this adminname is already existed, please try another one",
      });
    }
    if (!password) {
      return res.status(401).json({
        status: false,
        error: "Password is required",
      });
    }
    let validatePassword = password.match(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*@-_).{8,}$/
    );
    if (!validatePassword) {
      return res.status(401).json({
        status: false,
        error:
          "password must contain at least a minimum length of 8 characters, at least one uppercase letter, one lower case letter, one digit, and one special character",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newAdmin = await new Admin({
      adminName,
      email,
      password: hashedPassword,
    });
    await newAdmin.save();
    res
      .status(200)
      .json({ status: true, message: "admin was created successfully" });
  } catch (error) {
    if (error) {
      console.log(error);
    }
    res.status(401).json({ status: false, error: error.errors });
  }
};
