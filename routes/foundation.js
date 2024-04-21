const express = require("express");
const router = express.Router();

const { addFoundation, login } = require("../controllers/foundation");

router.route("/add").post(addFoundation);
router.route("/login").post(login);

module.exports = router;
