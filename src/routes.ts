import Router from "koa-router";
import { createUser } from "./controllers/createUser";
import { deleteUser } from "./controllers/deleteUser";
import { editUser } from "./controllers/editUser";
import { getAllUsers } from "./controllers/getAllUsers";
import { getUser } from "./controllers/getUser";

const PORT = process.env.PORT || 3000;

export const router = new Router();

router.get("/", async (ctx) => {
  ctx.body = `Seu servidor esta rodando em http://localhost:${PORT}`; //http://localhost:3000/
});

router.get("/users", getAllUsers);
router.post("/user", createUser);
router.get("/user/:nome", getUser);
router.put("/user/:nome", editUser);
router.delete("/user/:nome", deleteUser);
