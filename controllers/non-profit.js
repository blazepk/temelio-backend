const { v4: uuid } = require("uuid");
const MockEmailClient = require("../utils/mockEmailClient");

const emailClient = new MockEmailClient();

const nonprofits = [];
const addNonProfit = async (req, res) => {
  const { email, address, name } = req.body;
  nonprofits.push({ email, address, name, id: uuid() });
  res
    .status(200)
    .json({ success: true, messsage: "Non Profit added successfully" });
};
const donateToNonProfit = async (req, res) => {
  const nonProfit = nonprofits.find((item) => item.id === req.params.id);
  emailClient.sendEmail(
    nonProfit.email,
    "Test Subject",
    "This is a test email content"
  );
  res
    .status(200)
    .json({ success: true, message: `email sent to ${nonProfit.email}` });
};
const getNonprofits = async (req, res) => {
  res.status(200).json({ nonprofits });
};

module.exports = {
  getNonprofits,
  donateToNonProfit,
  addNonProfit,
};
