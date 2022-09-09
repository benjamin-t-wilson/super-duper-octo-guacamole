const { sqlInsert, sqlSelect } = require("./mySqlService.js");

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

  const result = await sqlSelect("todos", `todos.name = '${name}'`);

  if (result.errno) {
    return { status: 500, data: { message: result.code } };
  }

  if (!result[0]) {
    return { status: 404, data: "Unable to find todo with that name" };
  }

  return { status: 200, data: result[0] };
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

module.exports = { insertNewTodo, getTodo, addTodoItem };
