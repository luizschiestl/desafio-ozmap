import Koa from "koa";
import { router } from "./routes";

const PORT = process.env.PORT || 3000;

const koa = new Koa();

koa.use(router.routes()).use(router.allowedMethods());

export default koa.listen(PORT);
