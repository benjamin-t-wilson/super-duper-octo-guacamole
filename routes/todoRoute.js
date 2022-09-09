const router = require("express").Router();
const {
  insertNewTodo,
  getTodo,
  addTodoItem,
  deleteTodoItem,
} = require("../services/todoService.js");

router.post("/new", async (req, res) => {
  const result = await insertNewTodo(req);

  return res.status(result.status).json(result.data);
});

router.get("/:name", async (req, res) => {
  const result = await getTodo(req);

  return res.status(200).json(result.data);
});

router.post("/item", async (req, res) => {
  const result = await addTodoItem(req);

  return res.status(200).json(result.data);
});

router.delete("/:name", async (req, res) => {
  const result = await deleteTodoItem(req);

  return res.status(200).json(result.data);
});

module.exports = router;
