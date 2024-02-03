import { fastifyRouteAdapter } from "@/adapters/fastify-route-adapter";
import fastify, { FastifyInstance } from "fastify";
import { makeLoadClientsController, makeRegisterClientController } from "./controllers";

export const clientRoutes = (app: FastifyInstance) => {
  const ROUTE = "/clients" as const;

  app.post(ROUTE, fastifyRouteAdapter(makeRegisterClientController()));
  app.get(ROUTE, fastifyRouteAdapter(makeLoadClientsController()));
};
