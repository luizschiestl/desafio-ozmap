import { Context, Next } from "koa";
import Joi from "joi";

const schema = Joi.object({
  nome: Joi.string().min(3).max(30),
  nomeCompleto: Joi.string().min(4).optional(),
  email: Joi.string().email().message("Email inválido"),
  idade: Joi.number().min(18).message("Idade não pode ser menor que 18"),
});

export const validation = async (ctx: Context, next: Next) => {
  try {
    await schema.validateAsync(ctx.request.body, {
      stripUnknown: true,
      presence: ctx.method === "POST" ? "required" : "optional",
    });
    await next();
  } catch (error) {
    if (error instanceof Joi.ValidationError) {
      ctx.body = error.details[0];
      ctx.status = 400;
    } else {
      ctx.app.emit("error", error, ctx);
    }
  }
};
