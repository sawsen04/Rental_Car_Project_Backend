const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "username is required field"],
    },
    email: {
      type: String,
      required: [true, "Email is required field"],
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "This is invalid email",
      ],
    },
    phone: {
      type: String,
      required: [true, "phone is required field"],
    },
    password: {
      type: String,
    },
    imageUrl: {
      type: String,
      default:
        "https://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png",
    },
    isUser: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = User = mongoose.model("users", userSchema);
