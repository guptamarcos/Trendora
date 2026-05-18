
function generateCsrfToken(req,res) {
  return res.json({
    csrfToken: req.csrfToken(),
  });
}

module.exports = {
  generateCsrfToken,
};
