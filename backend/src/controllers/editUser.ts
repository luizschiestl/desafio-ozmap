import { Context } from 'koa';
import { prisma } from '../lib/prisma';

export const editUser = async (ctx: Context) => {
  try {
    const { nome, idade, nomeCompleto, email } = ctx.request.body;
    const user = await prisma.user.update({
      where: { nome: ctx.params.nome },
      data: { email, idade, nomeCompleto, nome },
    });
    ctx.status = 200;
    ctx.body = user;
  } catch (error) {
    ctx.app.emit('error', error, ctx);
  }
};
