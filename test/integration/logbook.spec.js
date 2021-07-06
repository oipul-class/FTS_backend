const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database");
const path = require("path");
const truncate = require("./truncate");

describe("Testando todas as rotas GET, POST, PUT e DELETE de inventario da filial", () => {
  let company_id;
  let token;

  let product_id;
  let branch_id;
  let logbook_id;

  const product_bar_code = "111";
  const product_name = "Carregador Xiaomi";

  beforeAll(async () => {
    const company_cnpj = "18111899255555";
    const company_password = "123456789";
    const company_phone = "000033333333";
    const branch_phone = "551122222299";

    const company_response = await request(app)
      .post("/company")
      .send({
        cnpj: company_cnpj,
        fantasy_name: "Eletronic-on-Store",
        social_reason: "Loja de eletronicos",
        place_number: 100,
        companie_password: company_password,
        phone: company_phone,
        nature_of_the_business: "Loja de eletronicos",
        commercial_email: "Eletronic@gmail.com",
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
        branch_name: "eletronic do Rio de janeiro",
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

  it("é possivel cadastrar item no inventario de uma filial", async () => {
    const product_response = await request(app)
      .post("/product")
      .set("Authorization", `bearer ${token}`)
      .field("product_name", product_name)
      .field("description", "Carregador turbo para celulares da marca xiaomi")
      .field("bar_code", product_bar_code)
      .field("cost_per_item", "300.5")
      .attach("image", path.resolve(__dirname, "./misc/xiaomi.jpg"))
      .field("unit_of_measurement_id", "13")
      .field("product_type_id", "1")
      .field("company_id", company_id)
      .timeout(20000);

    product_id = product_response.body.id;

    const response = await request(app)
      .post("/logbook")
      .set("Authorization", `bearer ${token}`)
      .send({
        date_of_acquisition: "2020-10-10",
        quantity_acquired: 20,
        branch_id: branch_id,
        product_id: product_response.body.id,
        lot: {
          lot_number: 111,
          manufacture_date: "2020-10-10",
          expiration_date: "9000-10-10",
        },
      });
    console.log("logbook body: ", response.body);

    expect(response.ok).toBeTruthy();
    expect(response.statusCode).toEqual(201);
    expect(response.body).toBeDefined();
    expect(typeof response.body).toEqual("object");
    expect(response.body).toHaveProperty("id");
    logbook_id = response.body.id;
  });

  it("é possivel listar todos os inventarios cadastrados no sistema com sucesso", async () => {
    const response = await request(app)
      .get("/logbook")
      .set("Authorization", `bearer ${token}`)
      .send();

    expect(response.ok).toBeTruthy();
    expect(response.statusCode).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it("é possivel listar todos os itens no inventario cadastrados em uma filial com sucesso", async () => {
    const response = await request(app)
      .get(`/branch/${branch_id}/logbook`)
      .set("Authorization", `bearer ${token}`)
      .send();

    expect(response.ok).toBeTruthy();
    expect(response.statusCode).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it("é possivel listar todos os itens no inventario cadastrados em todas filial de uma companhia com sucesso", async () => {
    const response = await request(app)
      .get(`/company/${company_id}/logbook`)
      .set("Authorization", `bearer ${token}`)
      .send();

    expect(response.ok).toBeTruthy();
    expect(response.statusCode).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it("é possivel buscar um item no inventario pelo id com sucesso", async () => {
    const response = await request(app)
      .get(`/logbook/find/${logbook_id}`)
      .set("Authorization", `bearer ${token}`)
      .send();

    expect(response.ok).toBeTruthy();
    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeDefined();
    expect(typeof response.body).toEqual("object");
    expect(response.body).toHaveProperty("id");
  });

  it("é possivel alterar dados de um iten no inventario com sucesso", async () => {
    const response = await request(app)
      .put(`/logbook/${logbook_id}`)
      .set("Authorization", `bearer ${token}`)
      .send({
        date_of_acquisition: "2020-02-10",
        quantity_acquired: 150,
      });

    expect(response.ok).toBeTruthy();
    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeDefined();
    expect(typeof response.body).toEqual("object");
    expect(response.body).toHaveProperty("id");
  });
});
