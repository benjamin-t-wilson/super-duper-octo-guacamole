const { getTodo } = require("../../services/todoService.js");
const { sqlSelect } = require("../../services/mySqlService.js");

jest.mock("../../services/mySqlService.js");

beforeEach(() => {
  sqlSelect.mockImplementation(() => []);
});

describe("getTodo tests", () => {
  it("returns 404 if it does not find a todo", async () => {
    const result = await getTodo({ params: "test" });
    expect(result.status).toBe(404);
  });

  it("returns 200 if it finds a todo", async () => {
    sqlSelect.mockImplementation(() => [{}]);

    const result = await getTodo({ params: "test" });
    expect(result.status).toBe(200);
  });

  it("has todo key and items key", async () => {
    sqlSelect.mockImplementation(() => [{}]);
    
    const result = await getTodo({ params: "test" });

    expect(result.data).toBeDefined();
    expect(result.data.items).toBeDefined();
  });
});
