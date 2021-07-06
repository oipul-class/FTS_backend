const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database");
const path = require("path");

describe("Testando todas as rotas GET, POST, PUT e DELETE de produtos", () => {
  afterAll(() => {
    connection.close();
  });

  let company_id;
  let token;

  const product_bar_code = "111000111";
  const product_name = "Carregador Xiaomi";
  let product_id;

  beforeAll(async () => {
    const company_cnpj = "18111812000000";
    const company_password = "123456789";
    const company_phone = "551144333444";

    const company_response = await request(app)
      .post("/company")
      .send({
        cnpj: company_cnpj,
        fantasy_name: "Eletro-Store",
        social_reason: "Loja de jogos",
        place_number: 100,
        companie_password: company_password,
        phone: company_phone,
        nature_of_the_business: "Loja de eletronicos",
        commercial_email: "Eletro@gmail.com",
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

  it("é possivel cadastrar um produto na companhia com sucesso", async () => {
    const response = await request(app)
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
      .timeout(10000);

    expect(response.ok).toBeTruthy();
    expect(response.statusCode).toEqual(201);
    expect(response.body).toBeDefined();
    expect(typeof response.body).toEqual("object");
    expect(response.body).toHaveProperty("id");
    product_id = response.body.id;
  });

  it("é possivel listar todos os produtos registrados em uma companhia com sucesso", async () => {
    const response = await request(app)
      .get(`/company/${company_id}/product`)
      .set("Authorization", `bearer ${token}`)
      .send();

    expect(response.ok).toBeTruthy();
    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeDefined();
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it("é possivel buscar um produto pelo id no sistema com sucesso", async () => {
    const response = await request(app)
      .get(`/product/find/${product_id}`)
      .set("Authorization", `bearer ${token}`)
      .send();

    expect(response.ok).toBeTruthy();
    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeDefined();
    expect(typeof response.body).toEqual("object");
    expect(response.body).toHaveProperty("id");
  });

  it("é possivel buscar um produto pelo código de barra com sucesso", async () => {
    const response = await request(app)
      .get(`/company/${company_id}/product/barCode/${product_bar_code}`)
      .set("Authorization", `bearer ${token}`)
      .send();

    expect(response.ok).toBeTruthy();
    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeDefined();
    expect(typeof response.body).toEqual("object");
    expect(response.body).toHaveProperty("id");
  });

  it("é possivel listar produtos pelo nome do produto e categoria com sucesso", async () => {
    const response = await request(app)
      .get(
        `/company/${company_id}/product?product_name="${product_name}"&product_type="Eletrônico"`
      )
      .set("Authorization", `bearer ${token}`)
      .send();

    expect(response.ok).toBeTruthy();
    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeDefined();
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it("é possivel alterar dados do produto com sucesso, nesse teste sera alterado a foto do produto", async () => {
    const response = await request(app)
      .put(`/product/${product_id}`)
      .set("Authorization", `bearer ${token}`)
      .attach("image", path.resolve(__dirname, "./misc/xiaomi alt.jpg"));

    expect(response.ok).toBeTruthy();
    expect(response.statusCode).toEqual(200);
    expect(response.body).toBeDefined();
    expect(typeof response.body).toEqual("object");
    expect(response.body).toHaveProperty("id");
  });

  it("é possivel deletar o produto da companhia com sucesso", async () => {
    const response = await request(app)
      .delete(`/product/${product_id}`)
      .set("Authorization", `bearer ${token}`)
      .send();

    expect(response.ok).toBeTruthy();
    expect(response.statusCode).toEqual(200);
  });
});
