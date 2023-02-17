import { Context } from 'koa';
import { prisma } from '../lib/prisma';

export const getAllUsers = async (ctx: Context) => {
  const { offset, limit, pageable } = ctx.state.paginate;

  const total = await prisma.user.count();

  const allUsers = await prisma.user.findMany({
    skip: offset,
    take: limit,
  });

  ctx.status = 200;
  ctx.body = {
    ...pageable(total),
    count: allUsers.length,
    rows: allUsers,
  };
};
