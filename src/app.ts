import cors from "@fastify/cors";
import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./main/config/env";
import { appRoutes } from "./main/config/routes";

export const app = fastify();

const V1_PREFIX = "/api/v1";

app.register(appRoutes, {
  prefix: V1_PREFIX,
});

app.register(cors);

app.get("/", (req, rep) => {
  return rep.send({ ok: true });
});

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Validation Error",
      validation: error.format(),
    });
  }

  if (env.NODE_ENV !== "prod") {
    console.error(error);
  }

  return reply.status(500).send({ message: "internal server error" });
});
