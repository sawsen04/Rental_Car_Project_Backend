const express = require("express");
const router = express.Router();
const verifiedToken = require("../../middlewares/verifyToken");
const upload = require("../../middlewares/multer");

//register
router.post("/register", require("./register"));
//login
router.post("/login", require("./login"));
//admin update his photo
router.put(
  "/updateAdminPhoto/:adminId",
  verifiedToken,
  upload.single("photo"),
  require("./updateAdminPhoto")
);
//admin update his infos
router.put("/updateInfo/:adminId", verifiedToken, require("./updateAdminInfo"));

//admin add car
router.post(
  "/addCar",
  verifiedToken,
  upload.array("photos", 10),
  require("./addCar")
);

//admin update car
router.put("/updateCar/:carId", verifiedToken, require("./updateCar"));

//admin delete car
router.delete("/deleteCar/:carId", verifiedToken, require("./deleteCar"));

//admin update car photo
router.put(
  "/updatePhotoCar/:carId",
  verifiedToken,
  upload.array("photos", 10),
  require("./updatePhotoCar")
);

//admin get cars
router.get("/cars", verifiedToken, require("./getCars"));

//admin get single car
router.get("/singleCar/:carId", verifiedToken, require("./getSingleCar"));
//admin get users
router.get("/users", verifiedToken, require("./getUsers"));

//admin get orders
router.get("/orders", verifiedToken, require("./getOrders"));

//admin get single order
router.get("/singleOrder/:orderId", verifiedToken, require("./getSingleOrder"));

//admin approve order
router.put("/approveOrder/:orderId/:carId", require("./approveOrder"));

module.exports = router;
