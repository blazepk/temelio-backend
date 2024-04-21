const express = require("express");
const router = express.Router();

const {
  getNonprofits,
  addNonProfit,
  donateToNonProfit,
} = require("../controllers/non-profit");

router.route("/list").get(getNonprofits);
router.route("/add").post(addNonProfit);
router.route("/donate/:id").get(donateToNonProfit);
// router.route("/static").get(getAllProductsStatic);

module.exports = router;
