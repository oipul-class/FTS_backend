const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database");
const path = require("path");
const truncate = require("./truncate");
const { response } = require("express");

describe("Testando todas as rotas GET, POST, PUT e DELETE de compra", () => {
  afterAll(() => {
    connection.close();
  });

  let company_id;
  let token;

  let product_id;
  let branch_id;
  let logbook_id;
  let purchase_id;

  const product_bar_code = "444";
  const product_name = "Carregador Xiaomi";

  beforeAll(async () => {
    const company_cnpj = "18111895555555";
    const company_password = "123456789";
    const company_phone = "000033773333";
    const branch_phone = "551129922299";

    const company_response = await request(app)
      .post("/company")
      .send({
        cnpj: company_cnpj,
        fantasy_name: "Eletronic-in-Store",
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
        branch_name: "eletronic in do Rio de janeiro",
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

  it("é possivel cadastrar uma compra filial", async () => {
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

    const logbook_response = await request(app)
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

    logbook_id = logbook_response.body.id;

    const response = await request(app)
      .post("/purchase")
      .set("Authorization", `bearer ${token}`)
      .send({
        payment_method_id: 1,
        branch_id: branch_id,
        items: [
          {
            product_id: product_response.body.id,
            quantity: 10,
          },
        ],
      });

    expect(response.ok).toBeTruthy();
    expect(response.statusCode).toEqual(201);
    expect(response.body).toBeDefined();
    expect(typeof response.body).toEqual("object");
    expect(response.body).toHaveProperty("id");
    purchase_id = response.body.id;
  });

  it("é possivel fazer uma listagem de todas as compras do sistema com sucesso", async () => {
    const response = await request(app)
      .get("/purchase")
      .set("Authorization", `bearer ${token}`)
      .send();

    expect(response.ok).toBeTruthy();
    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeDefined();
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it("é possivel fazer listagem de compras de uma filial com sucesso", async () => {
    const response = await request(app)
      .get(`/branch/${branch_id}/purchase`)
      .set("Authorization", `bearer ${token}`)
      .send();

    expect(response.ok).toBeTruthy();
    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeDefined();
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it("é possivel fazer listagem de compras das filials de uma companhia com sucesso", async () => {
    const response = await request(app)
      .get(`/company/${company_id}/purchase`)
      .set("Authorization", `bearer ${token}`)
      .send();

    expect(response.ok).toBeTruthy();
    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeDefined();
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it("é possivel buscar uma compra pelo id com sucesso", async () => {
    const response = await request(app)
      .get(`/purchase/find/${purchase_id}`)
      .set("Authorization", `bearer ${token}`)
      .send();

    expect(response.ok).toBeTruthy();
    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeDefined();
    expect(typeof response.body).toEqual("object");
    expect(response.body).toHaveProperty("id");
  });

  it("é possivel alterar dados de uma compra com sucesso", async () => {
    const response = await request(app)
      .put(`/purchase/${purchase_id}`)
      .set("Authorization", `bearer ${token}`)
      .send({
        payment_method_id: 4,
      });

    expect(response.ok).toBeTruthy();
    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeDefined();
    expect(typeof response.body).toEqual("object");
    expect(response.body).toHaveProperty("id");
  });

  it("é possivel deletar uma compra com sucesso", async () => {
    const response = await request(app)
      .delete(`/purchase/${purchase_id}`)
      .set("Authorization", `bearer ${token}`)
      .send();

    expect(response.ok).toBeTruthy();
    expect(response.statusCode).toEqual(200);
  });
});
