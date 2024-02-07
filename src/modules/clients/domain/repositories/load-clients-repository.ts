import { Client } from "@prisma/client";

export namespace LoadClientsRepository {
  export interface Params {
    page: number;
    limit: number;
    keyword?: string
  }

  export type Response = Promise<{
    clients: Client[];
    totalElements: number;
  }>;

  export interface Contract {
    load(params: LoadClientsRepository.Params): LoadClientsRepository.Response;
  }
}
