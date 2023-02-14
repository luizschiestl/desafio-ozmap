import Router from "koa-router";
import { createUserController } from "./controllers/createUser";
import { getAllUsersController } from "./controllers/getAllUsers";

const PORT = process.env.PORT || 3000;

export const router = new Router();

router.get("/", async (ctx) => {
  ctx.body = `Seu servidor esta rodando em http://localhost:${PORT}`; //http://localhost:3000/
});

router.get("/users", getAllUsersController);
router.post("/user", createUserController);
