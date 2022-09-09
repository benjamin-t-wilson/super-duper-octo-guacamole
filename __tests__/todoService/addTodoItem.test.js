const { addTodoItem } = require("../../services/todoService.js");
const { sqlInsert, sqlSelect } = require("../../services/mySqlService.js");

jest.mock("../../services/mySqlService.js");

beforeEach(() => {
  sqlInsert.mockImplementation(() => [{ insertId: 1, affectedRows: 1 }]);
  sqlSelect.mockImplementation(() => [{}])
});

describe("addTodoItem tests", () => {
  it("returns status 400 if missing name", async () => {
    const missingName = await addTodoItem({ body: { details: "test" } });
    expect(missingName.status).toBe(400);
  });

  it("returns status 400 if missing details", async () => {
    const missingDets = await addTodoItem({ body: { name: "test" } });
    expect(missingDets.status).toBe(400);
  });

  it("returns status 201 if all keys are present", async () => {
    const result = await addTodoItem({
      body: { name: "test", details: "test" },
      params: { name: "test" },
    });

    expect(result.status).toBe(201);
  });
});
