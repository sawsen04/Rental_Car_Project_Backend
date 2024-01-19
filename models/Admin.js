const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema(
  {
    adminName: {
      type: String,
      required: [true, "adminname is required field"],
    },
    email: {
      type: String,
      required: [true, "Email is required field"],
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "This is invalid email",
      ],
    },
    password: {
      type: String,
    },
    imageUrl: {
      type: String,
      default:
        "https://icons.veryicon.com/png/o/miscellaneous/yuanql/icon-admin.png",
    },
    isAdmin: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = Admin = mongoose.model("admins", adminSchema);
