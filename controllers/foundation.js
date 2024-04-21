const _ = require("lodash");
const { v4: uuid } = require("uuid");

const foundations = [];

const addFoundation = async (req, res) => {
  const foundationEmail = req.body.email;
  const foundationPassword = req.body.password;
  console.log("here", req.body);
  if (!foundationEmail || !foundationPassword) {
    return res.status(400).json({
      success: false,
      message: `Account not created for ${foundationEmail}`,
    });
  } else {
    foundations.push({
      email: foundationEmail,
      password: foundationPassword,
      id: uuid(),
    });
    res.status(200).json({
      success: true,
      message: `Account created for ${foundationEmail}`,
    });
  }
};
const login = async (req, res) => {
  //   console.log("req.body", req.body);
  const foundationsCopy = _.cloneDeep(foundations);
  const foundationFound = foundationsCopy.filter(
    (item) =>
      item.email === req.body.email && item.password === req.body.password
  );
  if (foundationFound.length <= 0) {
    return res
      .status(200)
      .json({ success: false, message: "foundation not found" });
  } else {
    return res.status(200).json({ success: true, message: "foundation found" });
  }
};

module.exports = {
  addFoundation,
  login,
  foundations,
};
