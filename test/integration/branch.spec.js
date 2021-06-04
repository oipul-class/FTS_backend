const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database");

describe("Testando inserção e listagem com sucesso do modulo de filial de companhia", () => {
  afterAll(() => {
    connection.close();
  });

  let companyID;
  let bearerToken

  it("é possivel inserir uma filial de uma companhia no sistema com sucesso", async () => {
    const company = await request(app).post("/company").send({
      cnpj: `33.235.804/0001-33`,
      fantasy_name: "test company to branch",
      social_reason: "test test",
      place_number: 1,
      companie_password: "12345678",
      cep: "06622-080",
      state: "SP",
      nature_of_the_business: "test of your business",
      commercial_email: "test@test.com",
    });

    const token = await request(app).post("/session").send({
      cnpj_ou_cpf: company.body.cnpj,
      password: "12345678",
    });

    bearerToken = `Bearer ${token.body.token}`

    const response = await request(app).post("/branch").set({ Authorization: bearerToken }).send({
      branch_name: "filial de teste",
      cep: "15062-526",
      place_number: 300,
      company_id: company.body.id,
    });

    expect(response.ok).toBeTruthy();
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("company_id");

    companyID = company.body.id;
  });

  it("é possivel listar todas as filiais cadastradas no sistema com sucesso", async () => {
    const response = await request(app).get(`/company/${companyID}/branch`).set({ Authorization: bearerToken }).send();

    expect(response.ok).toBeTruthy();
  });
});
