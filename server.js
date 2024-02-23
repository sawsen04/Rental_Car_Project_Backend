const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const Order = require("./models/Order");
const Car = require("./models/Car");

//environmentals variables
const DBURI = process.env.DBURI;
const PORT = process.env.PORT || 5000;

//functions
mongoose
  .connect(DBURI)
  .then(() => {
    console.log("database connected ✅");
  })
  .catch((err) => {
    console.log(err);
    console.log("can t connect to database ❌");
  });

//middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

async function finishRent(req, res, next) {
  let orders = await Order.find();
  let currentDate = Date.now();

  orders.forEach(async (order) => {
    let date = new Date(order.createdAt);
    let orderCreatedDate = date.getTime();
    // console.log(currentDate);
    // console.log(orderCreatedDate);
    // console.log(currentDate - orderCreatedDate >120000 );
    if (currentDate / 1000 - orderCreatedDate / 1000 >= 3600 && !order.isPaid) {
      await Order.findByIdAndDelete(order._id);
      await Car.findByIdAndUpdate(order.carId, {
        $set: {
          isAvailable: true,
        },
      });
    }
  });
  next();
  // next();
}
app.use(finishRent);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/user", require("./routes/user"));
app.use("/api/admin", require("./routes/admin"));

//routes
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`server is up and running on port ${PORT}`);
});
