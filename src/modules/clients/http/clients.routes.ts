import { fastifyRouteAdapter } from "@/adapters/fastify-route-adapter";
import fastify, { FastifyInstance } from "fastify";
import { makeRegisterClientController } from "./controllers";

export const clientRoutes = (app: FastifyInstance) => {
  const ROUTE = "/clients" as const;

  app.post(ROUTE, fastifyRouteAdapter(makeRegisterClientController()));
};
