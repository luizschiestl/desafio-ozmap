import { Context } from "koa";
import { prisma } from "../lib/prisma";

export const createUserController = async (ctx: Context) => {
  try {
    const user = await prisma.user.create({ data: ctx.request.body });
    ctx.status = 201;
    ctx.body = user;
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { message: "Erro interno" };
  }
};
