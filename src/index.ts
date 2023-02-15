import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import Koa, { Context } from "koa";
import koaBody from "koa-body";
import { router } from "./routes";

const PORT = process.env.PORT || 3000;

const koa = new Koa();

koa
  .use(koaBody())
  .use(router.routes())
  .use(router.allowedMethods())
  .on("error", (err, ctx: Context) => {
    if (err instanceof PrismaClientKnownRequestError) {
      switch (err.code) {
        case "P2002":
          ctx.status = 409;
          ctx.body = { message: "One or more fields not unique", ...err.meta };
          break;
        case "P2025":
          ctx.status = 404;
          ctx.body = { message: "User not found" };
          break;
        default:
          ctx.status = 500;
          ctx.body = { message: "Internal server error" };
          console.error(err);
          break;
      }
    } else {
      console.error(err);
      ctx.status = 500;
      ctx.body = { message: "Internal server error" };
    }
  });

export default koa.listen(PORT);
