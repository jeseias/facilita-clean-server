import { Client } from "../entities/clients";

export namespace CreateClientRepository {
  export interface Params {
    name: string;
    email: string;
    phone: string;
  }

  export type Response = Promise<Client.Model>;

  export interface Contract {
    create(
      params: CreateClientRepository.Params
    ): CreateClientRepository.Response;
  }
}
