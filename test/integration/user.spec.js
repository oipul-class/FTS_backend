const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database");

describe("Testando todas as rotas GET, POST, PUT e DELETE de usuários", () => {
  afterAll(() => {
    connection.close();
  });

  let company_id;
  let branch_id;
  const user_cpf = "50267194811";
  let token;
  let user_id;

  beforeAll(async () => {

    const company_cnpj = "18119812002166";
    const company_password = "123456789";
    const company_phone = "551144443434";
    const branch_phone = "551144343434";

    const company_response = await request(app)
      .post("/company")
      .send({
        cnpj: company_cnpj,
        fantasy_name: "Off-game",
        social_reason: "Loja de jogos",
        place_number: 100,
        companie_password: company_password,
        phone: company_phone,
        nature_of_the_business: "Loja de jogos",
        commercial_email: "OffGame@gmail.com",
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

    const branch_response = await request(app)
      .post("/branch")
      .set("Authorization", `bearer ${token}`)
      .send({
        branch_name: "Off-Game de jandira",
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

    branch_id = branch_response.body.id;
  });

  it("é possivel cadastrar um usuario com permissão de pdv", async () => {
    const response = await request(app)
      .post("/user")
      .set("Authorization", `bearer ${token}`)
      .send({
        cpf: user_cpf,
        rg: "255224532",
        user_password: "12345678",
        user_name: "Lucas De Costa tudo",
        branch_id,
        role_id: 1,
        permissions: "1,2,3,4,5,6",
      });

    expect(response.ok).toBeTruthy();
    expect(response.statusCode).toEqual(201);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveProperty("id");
    expect(typeof response.body).toEqual("object");
    user_id = response.body.id;
  });

  it("é possivel fazer a listagem de todos os usuários com sucesso", async () => {
    const response = await request(app)
      .get("/user")
      .set("Authorization", `bearer ${token}`)
      .send();

    expect(response.ok).toBeTruthy();
    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeDefined();
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it("é possivel buscar um usuário pelo id com sucesso", async () => {
    const response = await request(app)
      .get(`/user/find/${user_id}`)
      .set("Authorization", `bearer ${token}`)
      .send();

    expect(response.ok).toBeTruthy();
    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeDefined();
    expect(response.body).toHaveProperty("id");
    expect(typeof response.body).toEqual("object");
  });

  it("é possivel listar todos os usuários de uma filial com sucesso", async () => {
    const response = await request(app)
      .get(`/branch/${branch_id}/user`)
      .set("Authorization", `bearer ${token}`)
      .send();

    expect(response.ok).toBeTruthy();
    expect(response.statusCode).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it("é possivel listar todos os usuários que trabalham em uma filial da companhia enviada com sucesso", async () => {
    const response = await request(app)
      .get(`/company/${company_id}/user`)
      .set("Authorization", `bearer ${token}`)
      .send();

    expect(response.ok).toBeTruthy();
    expect(response.statusCode).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it("é possivel buscar um usuário por cpf com sucesso", async () => {
    const response = await request(app)
      .get(`/user/cpf/${user_cpf}`)
      .set("Authorization", `bearer ${token}`)
      .send();

    expect(response.ok).toBeTruthy();
    expect(response.statusCode).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it("é possivel alterar dados do usuário, nesse teste o nome do usuário será alterado com sucesso", async () => {
    const response = await request(app)
      .put(`/user/${user_id}`)
      .set("Authorization", `bearer ${token}`)
      .send({
        user_name: "Lucas De Costa Silvas",
      });

    expect(response.ok).toBeTruthy();
    expect(response.statusCode).toEqual(200);
    expect(typeof response.body).toEqual("object");
    expect(response.body).toHaveProperty("id");
  });

  it("é possivel deletar um usuário com sucesso", async () => {
    const response = await request(app)
      .delete(`/user/${user_id}`)
      .set("Authorization", `bearer ${token}`)
      .send();

    expect(response.ok).toBeTruthy();
    expect(response.statusCode).toEqual(200);
  });
});
