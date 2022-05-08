const express = require("express");
const validate = require("../middleware/validate");
const router = express.Router();
const {
  todoSchema,
  Todo,
  removeTodo,
  updateTodo,
  getAllTodo,
  getSingleTodo,
  validateTodo,
} = require("../models/todo");
const { Users } = require("../models/user");

router.post("/AddTodo", validate(validateTodo), async (req, res) => {
  const { todoName, username } = req.body;
  let user = await Users.findOne({ name: username });
  if (!user) return res.status(400).send("No user registered with this name.");
  const result = await Todo.createTodo(todoName, user._id.toString());
  result.save();
  res.send("Adding Todo Task Done Successfully");
});

router.post("/SingleTodo", async (req, res) => {
  const { username, todoName } = req.body;
  let user = await Users.findOne({ name: username });
  if (!user) return res.status(400).send("No user registered with this name.");
  const result = await getSingleTodo(todoName, user._id.toString());
  res.status(202).send(...result);
});

router.put("/UpdateTodo", async (req, res) => {
  const { updatedTodo, newTodoName, username } = req.body;
  let user = await Users.findOne({ name:username });
  if (!user) return res.status(400).send("No user registered with this name.");
  const result = await updateTodo(updatedTodo, newTodoName,user._id.toString());
  res.send(result);
});
router.delete("/RemoveTodo", async (req, res) => {
  const { todoName, username } = req.body;
  let user = await Users.findOne({ name:username });
  if (!user) return res.status(400).send("No user registered with this name.");
  const result = await removeTodo(todoName,user._id.toString());
  if (result) res.status(202).send("Done");
  else res.status(404).send("something goes wrong");
});

router.post("/AllTodo", async (req, res) => {
  const { username } = req.body;
  let user = await Users.findOne({ name: username });
  if (!user) return res.status(400).send("No user registered with this name.");
  // const result =await getSingleTodo(todoName,(user._id).toString());
  const result = await getAllTodo(user._id.toString());
  res.status(202).send(result);
});

module.exports = router;
