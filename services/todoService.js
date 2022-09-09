const { sqlInsert, sqlSelect, sqlDelete } = require("./mySqlService.js");

const insertNewTodo = async (req) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return { status: 400, data: "Missing name or description" };
  }

  const result = await sqlInsert("todos", { name, description });

  if (result.errno) {
    return { status: 500, data: { message: result.code } };
  }

  return {
    status: 201,
    data: {
      insertedId: result[0].insertId,
      affectedRows: result[0].affectedRows,
    },
  };
};

const getTodo = async (req) => {
  const { name } = req.params;

  const todo = await sqlSelect("todos", `todos.name = '${name}'`);

  if (todo.errno) {
    return { status: 500, data: { message: todo.code } };
  }

  if (!todo[0]) {
    return { status: 404, data: "Unable to find todo with that name" };
  }

  const items = await sqlSelect(
    "todo_items",
    `todo_items.todos_name = '${name}'`
  );

  if (items.errno) {
    return { status: 500, data: { message: items.code } };
  }

  return { status: 200, data: { todo: todo.flat()[0], items: items[0] } };
};

const addTodoItem = async (req) => {
  const { name, details } = req.body;

  if (!name || !details) {
    return { status: 400, data: "Missing name or details" };
  }

  req.params.name = name;
  const todo = await getTodo(req);

  if (todo.status !== 200) {
    return todo;
  }

  const result = await sqlInsert("todo_items", { details, todos_name: name });

  if (result.errno) {
    return { status: 500, data: { message: result.code } };
  }

  return {
    status: 201,
    data: {
      insertedId: result[0].insertId,
      affectedRows: result[0].affectedRows,
    },
  };
};

const deleteTodoItem = async (req) => {
  const { id } = req.body;

  if (!id) {
    return { status: 400, data: "Missing todo list item ID" };
  }

  const result = await sqlDelete("todo_items", `todo_items.id = ${id}`);

  if (result.errno) {
    return { status: 500, data: { message: result.code } };
  }

  return {
    status: 204,
    data: {
      affectedRows: result[0].affectedRows,
    },
  };
};

module.exports = { insertNewTodo, getTodo, addTodoItem, deleteTodoItem };
