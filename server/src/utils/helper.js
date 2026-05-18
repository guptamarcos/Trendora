const ExpressError = require("./ExpressError.js");

function getExactTime({ createdAt }) {
  try {
    const now = new Date();

    const years = Math.floor(
      (now - createdAt) / (1000 * 60 * 60 * 24 * 30 * 12),
    );
    const months = Math.floor((now - createdAt) / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor((now - createdAt) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((now - createdAt) / (1000 * 60 * 60));
    const minutes = Math.floor((now - createdAt) / (1000 * 60));
    const seconds = Math.floor((now - createdAt) / 1000);

    if (years > 0) {
      return `${years} year`;
    } else if (months > 0) {
      return `${months} months`;
    } else if (days > 0) {
      return `${days} days`;
    } else if (hours > 0) {
      return `${hours} hours`;
    } else if (minutes > 0) {
      return `${minutes} minutes`;
    }

    return `${seconds} seconds`;
  } catch (err) {
    console.log("Error at helper.js ", err);
    throw new ExpressError(500, "Internal server error");
  }
}

module.exports = getExactTime;
