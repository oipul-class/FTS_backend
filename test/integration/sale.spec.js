const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database");
const path = require("path");
const truncate = require("./truncate");
const { response } = require("express");

describe("Testando todas as rotas GET, POST, PUT e DELETE de vendas", () => {
  afterAll(() => {
    connection.close();
  });

  let company_id;
  let token;

  let product_id;
  let branch_id;
  let logbook_id;
  let sale_id;

  const product_bar_code = "442";
  const product_name = "Carregador Xiaomi";

  it("é possivel cadastrar uma venda na filial", async () => {
    const company_cnpj = "55555555555555";
    const company_password = "123456789";
    const company_phone = "011103377773";
    const branch_phone = "511129921799";

    const company_response = await request(app)
      .post("/company")
      .send({
        cnpj: company_cnpj,
        fantasy_name: "Eletronic-in-out-Store",
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

    console.log(company_response.body);
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
        company_id: company_response.body.id,
        address: {
          cep: "01001001",
          street: "Rua Fernando Pessoa Da Silva",
          district: "Pessoa",
          city: "São Paulo",
          uf: "SP",
        },
      });

    branch_id = branch_response.body.id;
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
      .field("company_id", company_response.body.id)
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

    const user_response = await request(app)
      .post("/user")
      .set("Authorization", `bearer ${token}`)
      .send({
        cpf: "50267194811",
        rg: "255224532",
        user_password: "12345678",
        user_name: "Lucas De Costa tudo",
        branch_id: branch_response.body.id,
        role_id: 1,
        permissions: "1,2,3,4,5,6",
      });

    const user_token_response = await request(app).post("/session").send({
      cnpj_ou_cpf: user_response.body.cpf,
      password: "12345678",
    });

    console.log("user token: ", user_token_response.body);
    token = user_token_response.body.token;

    const response = await request(app)
      .post("/sale")
      .set("Authorization", `bearer ${user_token_response.body.token}`)
      .send({
        payment_method_id: 1,
        branch_id: 1,
        items: [
          {
            product_id: product_response.body.id,
            quantity: 100,
          },
        ],
      });

    console.log("response body:", response.body);

    expect(response.ok).toBeTruthy();
    expect(response.statusCode).toEqual(201);
    expect(response.body).toBeDefined();
    expect(typeof response.body).toEqual("object");
    expect(response.body).toHaveProperty("id");
    sale_id = response.body.id;
  }, 10000);
});
