const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

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
app.use(require("./middlewares/finishRent"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/user", require("./routes/user"));
app.use("/api/admin", require("./routes/admin"));

//routes
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`server is up and running on port ${PORT}`);
});
