const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database");

describe("Testando todas as rotas GET, POST, PUT e DELETE de filial", () => {
  afterAll(() => {
    connection.close();
  });

  let company_id;
  let branch_id;
  let token = undefined;

  beforeAll(async () => {
    const company_cnpj = "18119812000166";
    const company_password = "123456789";
    const company_phone = "551144444434";

    const company_response = await request(app)
      .post("/company")
      .send({
        cnpj: company_cnpj,
        fantasy_name: "Bigo store",
        social_reason: "Uma das grandes lojas",
        place_number: 100,
        companie_password: company_password,
        phone: company_phone,
        nature_of_the_business: "Lojá geral",
        commercial_email: "Bigo@gmail.com",
        plan_id: 3,
        address: {
          cep: "01001000",
          street: "Rua Fernando Pessoa Da Silva",
          district: "Pessoa",
          city: "São Paulo",
          uf: "SP",
        },
      });

    company_id = company_response.body.id;

    const token_response = await request(app).post("/session").send({
      cnpj_ou_cpf: company_cnpj,
      password: company_password,
    });

    token = token_response.body.token;
  });

  const branch_phone = "551144444334";

  it("é possivel cadastrar uma filial com sucesso", async () => {
    const branch_response = await request(app)
      .post("/branch")
      .set("Authorization", `bearer ${token}`)
      .send({
        branch_name: "in-game do Rio de janeiro",
        place_number: 100,
        phone: branch_phone,
        company_id: company_id,
        address: {
          cep: "01001001",
          street: "Rua Fernando Pessoa Da Silva",
          district: "Pessoa",
          city: "São Paulo",
          uf: "SP",
        },
      });

    expect(branch_response.ok).toBeTruthy();
    expect(branch_response.statusCode).toEqual(201);
    expect(branch_response.body).toBeDefined();
    expect(branch_response.body).toHaveProperty("id");
    expect(typeof branch_response.body).toEqual("object");
    branch_id = branch_response.body.id;
  });

  it("é possivel listar todas as filiais com sucesso", async () => {
    const response = await request(app).get("/branch").send();

    expect(response.ok).toBeTruthy();
    expect(response.body).toBeDefined();
    expect(response.statusCode).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it("é possivel listar todas as filiais de uma companhia com sucesso", async () => {
    const response = await request(app)
      .get(`/company/${company_id}/branch`)
      .send();

    expect(response.ok).toBeTruthy();
    expect(response.body).toBeDefined();
    expect(response.statusCode).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it("é possivel alterar dados no caso o nome da filial com sucesso", async () => {
    const response = await request(app)
      .put(`/branch/${branch_id}`)
      .set("Authorization", `bearer ${token}`)
      .send({
        branch_name: "Filial In-Game de jandira",
      });
    console.log("put body: ", response.body);
    expect(response.ok).toBeTruthy();
    expect(response.body).toBeDefined();
    expect(response.statusCode).toEqual(200);
    expect(typeof response.body).toEqual("object");
  });

  it("é possiel deletar a filial com sucesso", async () => {
    const response = await request(app)
      .delete(`/branch/${branch_id}`)
      .set("Authorization", `bearer ${token}`)
      .send();

    console.log("delete route: ", response.body);
    expect(response.ok).toBeTruthy();
    expect(response.body).toBeDefined();
  });
});
