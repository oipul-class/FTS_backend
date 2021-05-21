const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database");
const truncate = require("./truncate");

describe("Testando inserção e listagem com sucesso do modulo de compania", () => {
  afterAll(() => {
    connection.close();
  });

  beforeAll(async (donne) => {
    await truncate(connection.models);
    donne();
  });

  it("é possivel inserir uma nova compania com sucesso", async () => {
    const response = await request(app).post("/company").send({
      cnpj: "89.235.804/0001-83",
      fantasy_name: "test company",
      social_reason: "test test",
      place_number: 1,
      companie_password: "12345678",
      cep: "06622-080",
      state: "SP",
      nature_of_the_business: "test of your business",
      commercial_email: "test@test.com",
    });

    expect(response.ok).toBeTruthy();
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("cnpj");
  });
});
