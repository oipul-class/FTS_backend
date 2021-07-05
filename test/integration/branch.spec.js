const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database");

describe("Testando todas as rotas GET, POST, PUT e DELETE de filial", () => {
  afterAll(() => {
    connection.close();
  });

  const company_cnpj = "18119812000166";
  const company_password = "123456789";
  const company_phone = "551144444434";
  const branch_phone = "551144444334";
  let company_id;
  let token = undefined;

  it("é possivel cadastrar uma filial com sucesso", async () => {
    const company_response = await request(app)
      .post("/company")
      .send({
        cnpj: company_cnpj,
        fantasy_name: "In-Game Entertainment",
        social_reason:
          "Provendo para todos Salões para jogatina e diversão para toda familia",
        place_number: 100,
        companie_password: company_password,
        phone: company_phone,
        nature_of_the_business: "Uma empressa que varios locais de diversão",
        commercial_email: "InGameEnt@gmail.com",
        plan_id: 3,
        address: {
          cep: "01001000",
          street: "Rua Fernando Pessoa Da Silva",
          district: "Pessoa",
          city: "São Paulo",
          uf: "SP",
        },
      });

    company_id = response.body.id;

    const token_response = await request(app).post("/session").send({
      cnpj_ou_cpf: company_cnpj,
      password: company_password,
    });

    token = token_response.body.token;

    const branch_response = await request(app)
      .post("/branch")
      .send({
        branch_name: "in-game do Rio de janeiro",
        place_number: 100,
        phone: "551144444454",
        company_id: 1,
        address: {
          cep: "01001001",
          street: "Rua Fernando Pessoa Da Silva",
          district: "Pessoa",
          city: "São Paulo",
          uf: "SP",
        },
      });

    expect(branch_response.ok).toBeTruthy();
    expect(branch_responsebody).toBeDefined();
    expect(branch_response.body).toHaveProperty("id");
  });
});
