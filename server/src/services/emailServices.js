const transporter = require("../utils/transporter.js");

const loginEmail = async (to) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: "Login Alert - Trendora",
      html: `
        <div style="
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          padding: 40px 20px;
        ">
          <div style="
            max-width: 600px;
            margin: auto;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          ">
            
            <!-- Header -->
            <div style="
              background: #111827;
              color: #ffffff;
              text-align: center;
              padding: 25px;
            ">
              <h1 style="margin: 0;">Trendora</h1>
              <p style="margin-top: 8px; color: #d1d5db;">
                Login Security Alert
              </p>
            </div>

            <!-- Content -->
            <div style="padding: 30px;">
              <h2 style="color: #111827;">
                Login Successful
              </h2>

              <p style="
                font-size: 16px;
                color: #4b5563;
                line-height: 1.6;
              ">
                Your account has been logged in successfully.
              </p>

              <div style="
                background: #f9fafb;
                border-left: 4px solid #10b981;
                padding: 15px;
                border-radius: 8px;
                margin: 20px 0;
              ">
                <p style="margin: 0; color: #111827;">
                  ✅ Login verified successfully
                </p>
              </div>

              <p style="
                color: #6b7280;
                font-size: 14px;
                line-height: 1.6;
              ">
                If this was you, no action is needed.
                If you did not log in to your account, please reset
                your password immediately and secure your account.
              </p>

              <div style="text-align: center; margin-top: 30px;">
                <a
                  href="#"
                  style="
                    display: inline-block;
                    background: #111827;
                    color: #ffffff;
                    text-decoration: none;
                    padding: 12px 24px;
                    border-radius: 8px;
                    font-weight: bold;
                  "
                >
                  Secure My Account
                </a>
              </div>
            </div>

            <!-- Footer -->
            <div style="
              background: #f9fafb;
              padding: 20px;
              text-align: center;
              font-size: 13px;
              color: #9ca3af;
            ">
              <p style="margin: 0;">
                © 2026 Trendora. All rights reserved.
              </p>
            </div>

          </div>
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

const sendOtpEmail = async (to, otp) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: "Your OTP Code - Trendora",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h1 style="color: #333;">Trendora Verification</h1>
          
          <p>Your One-Time Password (OTP) for verification is:</p>
          
          <h2 style="
            background: #f4f4f4;
            display: inline-block;
            padding: 10px 20px;
            border-radius: 8px;
            letter-spacing: 4px;
            color: #000;
          ">
            ${otp}
          </h2>

          <p>This OTP is valid for <strong>5 minutes</strong>.</p>
          
          <p>If you did not request this OTP, please ignore this email.</p>

          <br />
          <p>Thanks,</p>
          <p><strong>Trendora Team</strong></p>
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


module.exports = { loginEmail,sendOtpEmail };