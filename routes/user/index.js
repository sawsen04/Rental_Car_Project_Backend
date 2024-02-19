const express = require("express");
const router = express.Router();
const verifiedToken = require("../../middlewares/verifyToken");
const upload = require("../../middlewares/multer");

//register
router.post("/register", require("./register"));

//login
router.post("/login", require("./login"));

//user get cars
router.get("/cars", require("./getCars"));

//user get cars by multiple query
router.get("/filterCars", require("./filterCars"));

//user get single car
router.get("/singleCar/:carId", require("./getSingleCar"));

//user update his infos
router.put("/updateInfo/:userId", verifiedToken, require("./updateUserInfo"));

//user update his photo
router.put(
  "/updateUserPhoto/:userId",
  verifiedToken,
  upload.single("photo"),
  require("./updateUserPhoto")
);

//user add order
router.post(
  "/addOrder/:carId",
  verifiedToken,
  upload.array("photos", 2),
  require("./addOrder")
);

//user update his order
router.put("/updateOrder/:orderId", verifiedToken, require("./updateOrder"));

//user get his own order
router.get("/ownOrder", verifiedToken, require("./getOwnOrder"));

//user delete his account
router.delete("/deleteAccount", verifiedToken, require("./deleteAccount"));

module.exports = router;
