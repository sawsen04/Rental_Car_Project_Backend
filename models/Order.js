const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    drivingLicense: {
      type: [String],
      required: [true, "driving license is required field"],
    },
    pickUpDay: {
      type: String,
      required: [true, "pick up day is required field"],
    },
    returnDay: {
      type: String,
      required: [true, "return day is required field"],
    },
    ammount: {
      type: Number,
      required: [true, "ammount is required field"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    carId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cars",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = Order = mongoose.model("orders", orderSchema);
