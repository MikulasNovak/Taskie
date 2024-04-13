const express = require("express");
//const cors = require("cors");
const app = express();
const port = 3000;

const taskController = require("./controller/task");
const userController = require("./controller/user");
const categoryController = require("./controller/category");

app.use(express.json()); // podpora pro application/json
app.use(express.urlencoded({ extended: true })); // podpora pro application/x-www-form-urlencoded

//app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/user", userController);
app.use("/task", taskController);
app.use("/category", categoryController);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});