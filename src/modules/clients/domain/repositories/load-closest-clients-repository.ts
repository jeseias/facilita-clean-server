import { Client } from "@prisma/client";

export namespace LoadClosestClientsRepository {
  export interface Params {
    position_x: number;
    position_y: number;
  }

  export type Response = Promise<{
    clients: Client[];
  }>;

  export interface Contract {
    loadClosestClients(
      params: LoadClosestClientsRepository.Params
    ): LoadClosestClientsRepository.Response;
  }
}
