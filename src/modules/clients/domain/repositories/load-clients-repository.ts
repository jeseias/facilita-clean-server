import { Client } from "../entities/clients";

export namespace LoadClientsRepository {
  export interface Params {
    page: number;
    limit: number;
  }

  export type Response = Promise<{
    clients: Client.Model[];
    totalElements: number;
  }>;

  export interface Contract {
    load(params: LoadClientsRepository.Params): LoadClientsRepository.Response;
  }
}
