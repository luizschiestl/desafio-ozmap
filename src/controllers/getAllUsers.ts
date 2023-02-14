import { Context } from "koa";

export const getAllUsersController = async (ctx: Context) => {
  ctx.status = 200;
  ctx.body = { total: 0, count: 0, rows: [] };
};
