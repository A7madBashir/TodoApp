const Joi = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;
mongoose
  .connect("mongodb://localhost/jobtest")
  .then(() => console.log("Conntect to mongodb..."))
  .catch((err) => console.error("Could not connect to mongodb:", err));

const todoSchema = new Schema({
  todoName: { type: String, required: true, minlength: 2, maxlength: 25 },
  todoTime: { type: Date, default: Date.now },
  userId: { type: mongoose.Types.ObjectId },
});
todoSchema.statics.createTodo = async function (name, id) {
  return new this({
    todoName: name,
    userId: mongoose.mongo.ObjectId(id),
  });
};

const Todo = mongoose.model("Todo", todoSchema);

async function getAllTodo(userid) {
  const todo = await Todo.find({ userId: userid });
  if (todo) return todo;
  else return -1;
}
async function getSingleTodo(todoName, userid) {
  const todo = await Todo.find({
    name: todoName,
    userId: mongoose.mongo.ObjectId(userid),
  });
  console.log(todo);
  if (todo) return todo;
  else retur - 1;
}

async function updateTodo(todoName, newName, userid) {
  const todo = await Todo.findOneAndUpdate(
    {
      name: todoName,
      userId: mongoose.mongo.ObjectId(userid),
    },
    {
      $set: {
        todoName: newName,
      },
    },
    { new: true }
  );
  console.log(todo);
  
  if (!todo) return false;
  else return todo;
}

async function removeTodo(todoName, userid) {
  const deleted = await Todo.findOneAndRemove({
    name: todoName,
    userId: mongoose.mongo.ObjectId(userid),
  });
  return true;
}
function validateTodo(todo) {
  const schema = Joi.object({
    todoName: Joi.string().min(2).max(25).required(),
  });

  return schema.validate({ todoName: todo.todoName }, { abortEarly: false });
}

exports.Todo = Todo;
exports.validateTodo = validateTodo;
exports.todoSchema = todoSchema;
exports.updateTodo = updateTodo;
exports.removeTodo = removeTodo;
exports.getSingleTodo = getSingleTodo;
exports.getAllTodo = getAllTodo;
