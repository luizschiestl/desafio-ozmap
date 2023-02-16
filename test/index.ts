//sample test
//Para rodar os testes, use: npm test
//PS: Os testes não estão completos e alguns podem comnter erros.

// veja mais infos em:
//https://mochajs.org/
//https://www.chaijs.com/
//https://www.chaijs.com/plugins/chai-json-schema/
//https://developer.mozilla.org/pt-PT/docs/Web/HTTP/Status (http codes)

import chai from "chai";
import chaiHttp from "chai-http";
import chaiJson from "chai-json-schema";
import { faker } from "@faker-js/faker";

import app from "../src/index";
import { userSchema } from "./userSchema";

chai.use(chaiHttp);
chai.use(chaiJson);

const expect = chai.expect;

const randomUsers = Array.from({ length: 5 }).map(() => ({
  nome: faker.internet.userName(),
  email: faker.internet.email(),
  nomeCompleto: faker.name.fullName(),
  idade: faker.datatype.number({ min: 18, max: 104 }),
}));

//Inicio dos testes

//testes da aplicação
describe("Testes da aplicaçao", () => {
  it("o servidor esta online", function (done) {
    chai
      .request(app)
      .get("/")
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });

  it("deveria ser uma lista vazia de usuarios", function (done) {
    chai
      .request(app)
      .get("/users")
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.rows).to.eql([]);
        done();
      });
  });

  it("deveria criar o usuario luiz", function (done) {
    chai
      .request(app)
      .post("/user")
      .send({ nome: "luiz", email: "luiz@mail.com", idade: 28 })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res.body).to.be.jsonSchema(userSchema);
        done();
      });
  });

  it("deveria editar o usuario luiz", function (done) {
    chai
      .request(app)
      .put("/user/luiz")
      .send({ email: "luiz@hotmail.com" })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.jsonSchema(userSchema);
        expect(res.body).to.have.property("email").equals("luiz@hotmail.com");
        done();
      });
  });

  it("deveria tentar criar usuario menor de idade e falhar", function (done) {
    chai
      .request(app)
      .post("/user")
      .send({
        nome: faker.internet.userName(),
        email: faker.internet.email(),
        idade: 10,
      })
      .end(function (_, res) {
        expect(res).to.have.status(400);
        expect(res.body.message).to.be.equal("Idade não pode ser menor que 18");
        done();
      });
  });

  it("deveria tentar criar usuario com email inválido e falhar", function (done) {
    chai
      .request(app)
      .post("/user")
      .send({ nome: "jorge", email: "asdfasdfsdafds", idade: 20 })
      .end(function (_, res) {
        expect(res).to.have.status(400);
        expect(res.body.message).to.be.equal("Email inválido");
        done();
      });
  });

  it("o usuario naoExiste não existe no sistema", function (done) {
    chai
      .request(app)
      .get("/user/naoExiste")
      .end(function (_, res) {
        expect(res.body.message).to.be.equal("User not found");
        expect(res).to.have.status(404);
        done();
      });
  });

  it("o usuario luiz existe e é valido", function (done) {
    chai
      .request(app)
      .get("/user/luiz")
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.jsonSchema(userSchema);
        done();
      });
  });

  it("deveria excluir o usuario luiz", function (done) {
    chai
      .request(app)
      .delete("/user/luiz")
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(204);
        done();
      });
  });

  it("o usuario luiz não deve existir mais no sistema", function (done) {
    chai
      .request(app)
      .get("/user/luiz")
      .end(function (_, res) {
        expect(res.body.message).to.be.equal("User not found");
        expect(res).to.have.status(404);
        done();
      });
  });

  randomUsers.forEach((user, i) => {
    it(`deveria criar usuário aleatório ${i + 1}`, function (done) {
      chai
        .request(app)
        .post("/user")
        .send(user)
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res.body).to.be.jsonSchema(userSchema);
          done();
        });
    });
  });

  it("deveria ser uma lista com pelo menos 5 usuarios", function (done) {
    chai
      .request(app)
      .get("/users")
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.total).to.be.at.least(5);
        done();
      });
  });
});
