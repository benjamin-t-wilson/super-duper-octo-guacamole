const { insertNewTodo } = require("../../services/todoService.js");

jest.mock("mysql2/promise", () => ({
  createConnection: () => ({ query: () => [{ insertId: 1, affectedRows: 1 }], end: () => jest.fn() }),
}));

describe("insertNewTodo tests", () => {
  it("returns status 400 if missing name", async () => {
    const missingName = await insertNewTodo({ body: { description: "test" } });
    expect(missingName.status).toBe(400);
  });

  it("returns status 400 if missing description", async () => {
    const missingName = await insertNewTodo({ body: { name: "test" } });
    expect(missingName.status).toBe(400);
  });

  it("returns status 201 if both keys are present", async () => {
    const result = await insertNewTodo({
      body: { name: "test", description: "test" },
    });

    expect(result.status).toBe(201);
  });
});
