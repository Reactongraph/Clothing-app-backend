const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/userModels");
const bcrypt = require("bcrypt");
router.post("/signin", async (req, res) => {
  const data = req.body;
  console.log(data);


  const user = await User.findOne({ name: data.username });
  // const user=await User.findOne({phoneno:data.phoneno})

  if (user) {
    const authentication = await bcrypt.compare(data.password, user.password);
    if (authentication) {
      const accessToken = jwt.sign(
        {
          userwithroles: { name: user.username, roles: user.roles },
        },
        `${process.env.REQUEST_KEY}`,
        { expiresIn: "2m" }
      );
      const refreshToken = jwt.sign({ email: user.email }, `${process.env.REQUEST_KEY}`, {
        expiresIn: "1d",
      });
      const signedinuser = await User.findByIdAndUpdate(user._id, {
        $push: { refreshtoken: refreshToken },
        roles: data.role,
      });
      console.log(signedinuser);
      res.cookie("jwtrefreshtoken", refreshToken, {
        httpOnly: false,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "lax",
        secure: false,
        domain: process.env.SITE_URL,
        path: "/*",
      });
      res.status(202).send({
        activeStatus: true,
        refreshfounduser: signedinuser,
        msg: "authentication matched successfully",
        accessToken: accessToken,
      });
    } else {
      res.send({
        activeStatus: false,
        msg: "authentication failed",
        accessToken: null,
      });
    }
  } else {
    res.send("user not found");
  }
});

module.exports = router;
