const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database");

describe("Testando todas rotas GET, POST, PUT e DELETE com sucesso", () => {
  afterAll(() => {
    connection.close();
  });

  const company_cnpj = "18119812000116";
  const company_password = "123456789";
  const company_phone = "551144444444";
  let company_id;
  let token = undefined;

  it("é possivel inserir uma nova companhia com sucesso", async () => {
    const response = await request(app)
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

    expect(response.ok).toBeTruthy();
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("cnpj");
    expect(typeof response.body).toEqual("object");
    company_id = response.body.id;
  });

  it("é possivel listar todas as companhias registrada no sistema com sucesso", async () => {
    const response = await request(app).get("/company").send({});

    expect(response.ok).toBeTruthy();
    expect(response.body).toBeDefined();
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it("é possivel buscar a companhia registrada no sistema com sucesso", async () => {
    const response = await request(app)
      .get(`/company/find/${company_id}`)
      .send({});

    expect(response.ok).toBeTruthy();
    expect(response.body).toBeDefined();
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("cnpj");
    expect(typeof response.body).toEqual("object");
  });

  it("é possivel logar com a conta da empressa com sucesso", async () => {
    const response = await request(app).post("/session").send({
      cnpj_ou_cpf: company_cnpj,
      password: company_password,
    });

    expect(response.ok).toBeTruthy();
    expect(response.body).toBeDefined();
    expect(response.body).toHaveProperty("token");
    token = response.body.token;
  });

  it("é possivel alterar a dados que nesse caso é a razão social da empressa com sucesso", async () => {
    const response = await request(app)
      .put(`/company/${company_id}`)
      .set("Authorization", `bearer ${token}`)
      .send({
        social_reason: "Para a diverção de toda familia a qualquer hora",
      });

    expect(response.ok).toBeTruthy();
    expect(response.body).toBeDefined();
    expect(response.body).toHaveProperty("social_reason");
    expect(typeof response.body).toEqual("object");
  });

  it("é desativar a empressa com sucesso", async () => {
    const response = await request(app)
      .delete(`/company/${company_id}`)
      .set("Authorization", `bearer ${token}`)
      .send({});

    expect(response.ok).toBeTruthy();
  });
});
