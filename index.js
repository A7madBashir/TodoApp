const express = require("express");
const app = express();
const todos = require("./routes/todos");
const users = require("./routes/user");

app.use(express.json());
app.use("/todos", todos);
app.use("/users", users);
app.get("/", (req, res) => {
  res.send("Todo App");
});

app.listen(3000, () => console.log("connection success.."));
