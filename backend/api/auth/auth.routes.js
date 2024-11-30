const router = require("express").Router();
const User = require("../users/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtSecretKey } = require("../../config");

router.post("/register", (req, res) => {
  const { name, dob, email, password } = req.body;
  if (!name || !dob || !email || !password) {
    return res
      .status(400)
      .send({ message: "Some required fields are missing!" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  new User({ name, dob, email, password: hashedPassword })
    .save()
    .then((data) => {
      const { name, _id, email, dob } = data;
      const user = {
        name,
        _id,
        email,
        dob,
      };
      return res.send({ user });
    })
    .catch((err) => {
      res.status(err.status || 500).send(err);
    });
});

router.post("/login", (req, res) => {
  const data = req.body;
  const { email, password: userProvidedPassword } = data;
  User.findOne({ email })
    .then((data) => {
      if (data) {
        const { password: storedHash, name, _id, email, dob } = data;
        const user = {
          name,
          _id,
          email,
          dob,
        };
        if (bcrypt.compareSync(userProvidedPassword, storedHash)) {
          const token = jwt.sign({ user }, jwtSecretKey, {
            expiresIn: "1day",
          });
          res.cookie("token", token, { httpOnly: true });
          return res.send({ message: "Success" });
        }
        return res.status(401).send({ message: "Wrong email/password!" });
      }
      return res.status(404).send({ message: "User not found!" });
    })
    .catch((err) => {
      res.status(err.status || 500).send(err);
    });
});

module.exports = router;
