const csrf = require("csurf");

const csrfProtection = csrf({
  cookie: {
    key: "_csrf",
    httpOnly: true,
    signed: true,
    sameSite: "strict",
    secure: false,
    maxAge: 1 * 24 * 60 * 60 * 1000,
  },
});

module.exports = csrfProtection;