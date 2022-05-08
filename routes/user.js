const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const { validateuser, Users } = require("../models/user");

router.post("/", validate(validateuser), async (req, res) => {
  const { username } = req.body;
  const result = await Users.createUser(username);
  await result.save();
  res.send(result);
});

module.exports = router;
