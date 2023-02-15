import { Context } from "koa";
import { prisma } from "../lib/prisma";

export const getUser = async (ctx: Context) => {
  const user = await prisma.user.findUnique({
    where: { nome: ctx.params.nome },
  });

  if (user) {
    ctx.status = 200;
    ctx.body = user;
  } else {
    ctx.status = 404;
    ctx.body = { message: "User not found" };
  }
};
