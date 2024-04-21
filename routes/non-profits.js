const express = require("express");
const router = express.Router();

const { getNonprofits } = require("../controllers/non-profit");

router.route("/").get(getNonprofits);
// router.route("/static").get(getAllProductsStatic);

module.exports = router;
