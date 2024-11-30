const router = require("express").Router();
const Todo = require("./todo.model");

router.get("/all", (req, res) => {
  const user = req.user;
  Todo.find({ user: user._id })
    .populate("user", "name")
    .then((data) => {
      res.send({ todos: data });
    })
    .catch((err) => {
      res.send(err);
    });
});

router.put("/:id", (req, res) => {
  Todo.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((data) => {
      res.send({ todo: data });
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/", (req, res) => {
  const data = req.body;
  const user = req.user;
  const newTodo = new Todo({ ...data, user: user._id });
  newTodo
    .save()
    .then((data) => {
      res.send({ todo: data });
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
