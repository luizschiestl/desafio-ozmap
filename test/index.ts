//sample test
//Para rodar os testes, use: npm test
//PS: Os testes não estão completos e alguns podem comnter erros.

// veja mais infos em:
//https://mochajs.org/
//https://www.chaijs.com/
//https://www.chaijs.com/plugins/chai-json-schema/
//https://developer.mozilla.org/pt-PT/docs/Web/HTTP/Status (http codes)

import app from "../src/index";
import { userSchema } from "./userSchema";

import chai from "chai";
import chaiHttp from "chai-http";
import chaiJson from "chai-json-schema";

chai.use(chaiHttp);
chai.use(chaiJson);

const expect = chai.expect;

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
      .send({ email: "luiz@gmail.com" })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.jsonSchema(userSchema);
        expect(res.body).to.have.property("email").equals("luiz@gmail.com");
        done();
      });
  });
  //...adicionar pelo menos mais 5 usuarios. se adicionar usuario menor de idade, deve dar erro. Ps: não criar o usuario naoExiste

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
