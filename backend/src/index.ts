import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import Koa, { Context } from 'koa';
import koaBody from 'koa-body';
import { koaSwagger } from 'koa2-swagger-ui';

import { router } from './routes';

import yamljs from 'yamljs';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pagination = require('koa-pagination-v2');

const PORT = process.env.PORT || 3000;

const koa = new Koa();

const spec = yamljs.load(__dirname + '/doc/swagger.yml');

koa
  .use(
    koaSwagger({
      swaggerOptions: { spec },
      routePrefix: '/swagger',
    })
  )
  .use(pagination({ defaultLimit: 5 }))
  .use(koaBody())
  .use(router.routes())
  .use(router.allowedMethods())
  .on('error', (err, ctx: Context) => {
    if (err instanceof PrismaClientKnownRequestError) {
      switch (err.code) {
        case 'P2002':
          ctx.status = 409;
          ctx.body = {
            message: 'One or more fields not unique',
            ...err.meta,
          };
          break;
        case 'P2025':
          ctx.status = 404;
          ctx.body = { message: 'User not found' };
          break;
        default:
          ctx.status = 500;
          ctx.body = { message: 'Internal server error' };
          console.error(err);
          break;
      }
    } else {
      console.error(err);
      ctx.status = 500;
      ctx.body = { message: 'Internal server error' };
    }
  });

export default koa.listen(PORT);
