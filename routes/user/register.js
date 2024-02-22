const User = require("../../models/User");
const bcrypt = require("bcrypt");
module.exports = async (req, res) => {
  try {
    let { fullName, email, password, phone } = req.body;
    let existedUser = await User.findOne({ email });
    let existedFullname = await User.findOne({ fullName });
    if (existedUser) {
      return res.status(401).json({
        status: true,
        message: "this email is already existed, please try another one",
      });
    }
    if (existedFullname) {
      return res.status(401).json({
        status: true,
        message: "this fullname is already existed, please try another one",
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
    const newUser = await new User({
      fullName,
      email,
      phone,
      password: hashedPassword,
    });
    await newUser.save();
    res
      .status(200)
      .json({ status: true, message: "user was created successfully" });
  } catch (error) {
    // if (error) {
    //   console.log(error);
    // }
    res.status(401).json({ status: false, error: error.errors });
  }
};
