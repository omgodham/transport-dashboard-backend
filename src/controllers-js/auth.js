const bcrypt = require("bcrypt");
const User = require("../models-js/user.js");

const saltRounds = 10;

exports.signIn = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        bcrypt.compare(
          req.body.password,
          user.password,
          function (err, result) {
            if (result) {
              return res.status(200).json({
                success: true,
                message: "Login successful",
                user: user,
              });
            } else {
              return res
                .status(400)
                .json({ success: false, message: "Wrong password" });
            }
          }
        );
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Email does not found" });
      }
    })
    .catch((error) => {
      return res
        .status(400)
        .json({ success: false, message: "Sign in failed" });
    });
};

exports.signUp = (req, res) => {
  let { password, email } = req.body;
  bcrypt.hash(password, saltRounds, function (err, hash) {
    const user = new User({ email: email, password: hash });
    user.save((error, result) => {
      if (error) {
        return res.status(400).json({ message: "Sign up failed" });
      }
      return res.status(200).json(result);
    });
  });
};
