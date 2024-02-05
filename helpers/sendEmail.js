const nodemailer = require("nodemailer");
require("dotenv").config();

const { GMAIL_PASSWORD, GMAIL_EMAIL } = process.env;

const nodemailerConfig = {
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: GMAIL_EMAIL,
    pass: GMAIL_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: GMAIL_EMAIL };
  return transport.sendMail(email);
};

module.exports = { sendEmail };
