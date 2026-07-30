const csrf = require("csurf");

const csrfProtection = csrf({
  cookie: {
    key: "_csrf",
    httpOnly: true,
    signed: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 24 * 60 * 60 * 1000,
  },
});

module.exports = csrfProtection;