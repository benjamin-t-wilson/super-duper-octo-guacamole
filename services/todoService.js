const { sqlInsert } = require("./mySqlService.js");

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
    status: 200,
    data: { insertedId: result[0].insertId, affectedRows: result[0].affectedRows },
  };
};

module.exports = { insertNewTodo };
