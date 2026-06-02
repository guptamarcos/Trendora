const transporter = require("../utils/transporter.js");

const loginEmail = async function (to) {
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


const sendOtpEmail = async function (to, otp) {
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
    console.log("Email service error: ", err.message);
    return false;
  }
};


const passwordUpdateEmail = async function (to) {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: "🔐 Your Password Has Been Updated Successfully",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e5e5e5; border-radius: 10px; background-color: #f9f9f9;">
          
          <h2 style="color: #333; text-align: center;">
            Password Updated Successfully
          </h2>

          <p style="font-size: 16px; color: #555;">
            Hello,
          </p>

          <p style="font-size: 16px; color: #555;">
            This is to confirm that your account password was successfully updated.
          </p>

          <div style="background: #fff; padding: 15px; border-left: 4px solid #4CAF50; margin: 20px 0;">
            <p style="margin: 0; color: #333;">
              ✅ Your password has been changed successfully.
            </p>
          </div>

          <p style="font-size: 15px; color: #555;">
            If you made this change, no further action is required.
          </p>

          <p style="font-size: 15px; color: #d9534f; font-weight: bold;">
            Didn’t update your password?
          </p>

          <p style="font-size: 15px; color: #555;">
            Please reset your password immediately and contact support if you believe your account has been compromised.
          </p>

          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />

          <p style="font-size: 13px; color: #999; text-align: center;">
            This is an automated security email. Please do not reply.
          </p>

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


const orderConfirmationEmail = async function ( to, orderInformation) {
  try {
    const { customerName, products, paymentMethod, totalAmount, orderDate } = orderInformation;

    const productHTML = products
      .map(
        (product) => `
          <li style="margin-bottom:8px;">
            ${product.name} 
            (Qty: ${product.quantity}) 
            - ₹${product.total}
          </li>
        `
      )
      .join("");

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: "Order Confirmed 🎉",

      html: `
      <div style="
        font-family: Arial, sans-serif;
        max-width: 500px;
        margin: auto;
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 10px;
      ">

        <h2 style="color:#333;">
          Order Confirmed 🎉
        </h2>

        <p>Hello ${customerName},</p>

        <p>
          Your order has been placed successfully.
        </p>

        <p>
          <strong>Order Date:</strong> ${orderDate}
        </p>

        <h3>Items Ordered</h3>

        <ul style="padding-left:20px;">
          ${productHTML}
        </ul>

        <p>
          <strong>Payment:</strong> 
          ${paymentMethod.toUpperCase()}
        </p>

        <p>
          <strong>Total Amount:</strong> 
          ₹${totalAmount}
        </p>

        <p style="
          margin-top:20px;
          color:#666;
          font-size:14px;
        ">
          Thank you for shopping with us ❤️
        </p>

      </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    return info?.accepted?.length > 0;
  } catch (err) {
    console.log(
      "Error occurred in order confirmation email:",
      err.message
    );
    return false;
  }
};

module.exports = {
  loginEmail,
  sendOtpEmail,
  passwordUpdateEmail,
  orderConfirmationEmail,
};
