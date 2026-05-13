const twilio = require("../config/twilioConfig.js");

async function loginSms() {
  try {
    const result = await twilio.messages.create({
      body: "Your are login successfully in Trendora",
      from: process.env.SMS_PHONE_NUMBER,
      to: process.env.MY_PHONE_NUMBER,
    });

    return true;
  } catch (err) {
    console.log("Sms service error", err);
    return false;
  }
}

module.exports = { loginSms };
