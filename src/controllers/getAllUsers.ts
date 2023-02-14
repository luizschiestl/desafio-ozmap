import { Context } from "koa";
import { prisma } from "../lib/prisma";

export const getAllUsers = async (ctx: Context) => {
  const allUsers = await prisma.user.findMany();

  ctx.status = 200;
  ctx.body = { total: allUsers.length, count: allUsers.length, rows: allUsers };
};
