import { Context } from 'koa';
import { prisma } from '../lib/prisma';

export const deleteUser = async (ctx: Context) => {
  try {
    await prisma.user.delete({ where: { nome: ctx.params.nome } });
    ctx.status = 204;
  } catch (error) {
    ctx.app.emit('error', error, ctx);
  }
};
