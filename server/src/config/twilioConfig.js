const twilio = require("twilio");

const accountSid = process.env.SMS_ACCOUNT_SID;
const authToken = process.env.SMS_AUTH_TOKEN ;

const client = new twilio(accountSid, authToken);


module.exports = client;