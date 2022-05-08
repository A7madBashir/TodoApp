const express = require("express");
const error = require("./middleware/error");
const app = express();
const todos = require("./routes/todos");
const users = require("./routes/user");

app.use(express.json());
app.use("/todos", todos);
app.use("/users", users);
app.use(error);
app.get("/", (req, res) => {
  res.send("Todo App");
});

app.listen(3000, () => console.log("connection success.."));
