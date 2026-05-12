const userServices = require("../services/userServices.js");

async function getUser(req, res) {
  const result = await userServices.getUser(req.user);
  
  return res.status(200).json(result);
}

async function getAllUser(req, res) {
  const result = await userServices.getAllUser();

  return res.status(200).json(result);
}

async function updateProfileInfo(req, res) {
  const userId = req.user._id;
  const result = await userServices.updateProfileInfo(req.body,userId);

  return res.status(200).json(result);
}

async function updateProfilePassword(req, res) {
  const result = await userServices.updateProfilePassword(req.body,req.user);

  return res.status(200).json(result);
}

async function uploadProfileImage(req, res) {
  const result = await userServices.uploadProfileImage(req.user,req.file);

  return res.status(200).json(result);
}

async function deleteUser(req, res) {
  const result = await userServices.deleteUser(req.params.userId);

  return res.status(200).json(result);
}

module.exports = {
  getUser,
  updateProfileInfo,
  updateProfilePassword,
  uploadProfileImage,
  deleteUser,
  getAllUser,
};
