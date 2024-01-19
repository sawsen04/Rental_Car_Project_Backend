const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carSchema = new Schema(
  {
    brand: {
      type: String,
      required: [true, "brand is required field"],
    },
    model: {
      type: String,
      required: [true, "model is required field"],
    },
    description: {
      type: String,
      required: [true, "description is required field"],
    },
    year: {
      type: String,
      required: [true, "year is required field"],
    },
    mileage: {
      type: String,
      required: [true, "mileage is required field"],
    },
    imageUrl: {
      type: [String],
      required: [true, "image is required field"],
      default:
        "https://png.pngtree.com/png-vector/20190215/ourmid/pngtree-vector-car-icon-png-image_515736.jpg",
    },
    gearBox: {
      type: String,
      gearBox: [true, "image is required field"],
    },
    pricePerDay: {
      type: String,
      required: [true, "price is required field"],
    },
    fuel: {
      type: String,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = Car = mongoose.model("cars", carSchema);
