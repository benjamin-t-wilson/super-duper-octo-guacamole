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

  const todo = await sqlSelect("todos", `todos.name = '${name}'`);

  if (todo.errno) {
    return { status: 500, data: { message: todo.code } };
  }

  if (!todo[0]) {
    return { status: 404, data: "Unable to find todo with that name" };
  }

  return { status: 200, data: todo[0] };
};

module.exports = { insertNewTodo, getTodo };
