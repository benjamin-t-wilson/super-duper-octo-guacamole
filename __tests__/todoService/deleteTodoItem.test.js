const { deleteTodoItem } = require("../../services/todoService.js");
const { sqlDelete } = require("../../services/mySqlService.js");

jest.mock("../../services/mySqlService.js");

beforeEach(() => {
  sqlDelete.mockImplementation(() => []);
});

describe("deleteTodoItem tests", () => {
  it("returns status 400 if missing id", async () => {
    const result = await deleteTodoItem({ body: {} });

    expect(result.status).toBe(400);
  });

  it("returns status 204 on successful delete", async () => {
    sqlDelete.mockImplementation(() => [{}]);
    const result = await deleteTodoItem({ body: { id: 1 } });

    expect(result.status).toBe(204);
  });
});
