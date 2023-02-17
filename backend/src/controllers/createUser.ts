import { Context } from 'koa';
import { prisma } from '../lib/prisma';

export const createUser = async (ctx: Context) => {
  try {
    const { nome, idade, nomeCompleto, email } = ctx.request.body;
    const user = await prisma.user.create({
      data: { email, idade, nomeCompleto, nome },
    });
    ctx.status = 201;
    ctx.body = user;
  } catch (error) {
    ctx.app.emit('error', error, ctx);
  }
};
