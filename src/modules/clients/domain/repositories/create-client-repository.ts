import { Client } from "@prisma/client";

export namespace CreateClientRepository {
  export interface Params {
    name: string;
    email: string;
    phone: string;
    position_y: number
    position_x: number
  }

  export type Response = Promise<Client>;

  export interface Contract {
    create(
      params: CreateClientRepository.Params
    ): CreateClientRepository.Response;
  }
}
