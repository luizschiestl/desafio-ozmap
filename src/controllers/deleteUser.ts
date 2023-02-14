import { Context } from "koa";
import { prisma } from "../lib/prisma";

export const deleteUser = async (ctx: Context) => {
  const user = await prisma.user.delete({ where: { nome: ctx.params.nome } });

  if (user) {
    ctx.status = 204;
  } else {
    ctx.status = 404;
    ctx.body = { error: "User not found" };
  }
};
