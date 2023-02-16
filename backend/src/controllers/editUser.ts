import { Context } from 'koa';
import { prisma } from '../lib/prisma';

export const editUser = async (ctx: Context) => {
  try {
    const user = await prisma.user.update({
      where: { nome: ctx.params.nome },
      data: ctx.request.body,
    });
    ctx.status = 200;
    ctx.body = user;
  } catch (error) {
    ctx.app.emit('error', error, ctx);
  }
};
