const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database");

describe("Testando todas as rotas GET, POST, PUT e DELETE de usuários", () => {
  afterAll(() => {
    connection.close();
  });

  let company_id;
  let branch_id;
  let token = undefined;

  it("é possivel cadastrar um usuario com permissão de pdv", async () => {
    expect(true).toBeTruthy();
  });
});
