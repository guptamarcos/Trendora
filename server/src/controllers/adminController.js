const adminServices = require("../services/adminServices.js");

async function DashboardInfo(req, res) {
  const result = await adminServices.dashboardInfo();

  return res.status(200).json({
    success: true,
    DashboardInfo: result.DashboardInfo,
  });
}

module.exports = { DashboardInfo };
