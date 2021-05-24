const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database");
const truncate = require("./truncate");

describe("Testando inserção e listagem com sucesso do modulo de filial de companhia", () => {
  afterAll(() => {
    connection.close();
  });

  beforeAll(async (done) => {
    await truncate(connection.models);
    done();
  });

  it("é possivel inserir uma filial de uma companhia no sistema com sucesso", async () => {
    const response = await request(app).post("/branch").send({
      branch_name: "filial de teste",
      cep: "15062-526",
      place_number: 300,
      company_id: company.body.id,
    });

    expect(response.ok).toBeTruthy();
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("company_id");
  });
});
