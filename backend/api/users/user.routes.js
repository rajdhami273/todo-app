const router = require("express").Router();
const User = require("./user.model");

router.get("/me", (req, res) => {
  const user = req.user;
  User.findById(user._id)
    .then((data) => {
      const { name, _id, email, dob } = data;
      const userInfo = {
        name,
        _id,
        email,
        dob,
      };
      res.send({ user: userInfo });
    })
    .catch((err) => {
      res.send(err);
    });
});
router.get("/logout", (req, res) => {
  const user = req.user;
  User.findById(user._id)
    .then((data) => {
      if (data) {
        res.clearCookie("token");
        return res.send({ message: "Success" });
      }
      res.status(404).send({ message: "User not found" });
    })
    .catch((err) => {
      res.status(err.status || 500).send(err);
    });
});
router.patch("/", (req, res) => {
  const { name, dob } = req.body;
  const user = req.user;
  User.findByIdAndUpdate(user._id, { name, dob }, { new: true })
    .then((data) => {
      res.send({ user: data });
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
