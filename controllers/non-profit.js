const { v4: uuid } = require("uuid");
const MockEmailClient = require("../utils/mockEmailClient");

const emailClient = new MockEmailClient();

const nonprofits = [];
const sentEmails = [];
const addNonProfit = async (req, res) => {
  const { email, address, name } = req.body;
  nonprofits.push({ email, address, name, id: uuid(), sentEmail: false });
  res
    .status(200)
    .json({ success: true, messsage: "Non Profit added successfully" });
};
const donateToNonProfit = async (req, res) => {
  const nonProfit = nonprofits.find((item) => item.id === req.params.id);
  const emailContent = emailClient.sendEmail(
    nonProfit.email,
    "Test Subject",
    `This is an email template for ${nonProfit.email}. Address of the non profit is ${nonProfit.address} . The name of the nonProfit is ${nonProfit.name}`
  );
  nonProfit.sentEmail = true;
  console.log("non profits", nonprofits);

  sentEmails.push({ id: nonProfit.id, emailContent });
  res
    .status(200)
    .json({ success: true, message: `email sent to ${nonProfit.email}` });
};

const listNonProfitsEmailSent = async (req, res) => {
  const emailList = nonprofits.filter((item) => item.sentEmail === true);
  console.log("email List", emailList);
  res.status(200).json({ success: true, data: emailList });
};

const showEmail = async (req, res) => {
  const id = req.params.id;
  const sentEmailById = sentEmails.find((item) => item.id === id);
  if (!sentEmailById) {
    return res
      .status(200)
      .json({ success: false, message: "No Email found for the given id" });
  }

  res.status(200).json({
    success: true,
    emailSent: sentEmailById.emailContent,
  });
};

const getNonprofits = async (req, res) => {
  res.status(200).json({ nonprofits });
};

module.exports = {
  getNonprofits,
  donateToNonProfit,
  addNonProfit,
  listNonProfitsEmailSent,
  showEmail,
};
