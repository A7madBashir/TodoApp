module.exports = function (err, req, res, next) {
  console.log("Entering error section.")
  res.status(500).send("Something failed.");
};
