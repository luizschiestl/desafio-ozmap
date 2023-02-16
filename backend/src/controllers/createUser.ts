import { Context } from 'koa';
import { prisma } from '../lib/prisma';

export const createUser = async (ctx: Context) => {
  try {
    const user = await prisma.user.create({ data: ctx.request.body });
    ctx.status = 201;
    ctx.body = user;
  } catch (error) {
    ctx.app.emit('error', error, ctx);
  }
};
