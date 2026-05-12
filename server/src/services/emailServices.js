const transporter = require("../utils/transporter.js");

const loginEmail = async (to) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: "Login Alert - Trendora",
      html: `
        <div>
          <h1>Welcome to Trendora</h1>
          <p>Your account was logged in successfully.</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    return info?.accepted?.length > 0;

  } catch (err) {
    console.log("Email service error:", err.message);

    return false;
  }
};

module.exports = { loginEmail };