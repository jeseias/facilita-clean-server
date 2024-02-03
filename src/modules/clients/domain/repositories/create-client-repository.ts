export namespace CreateClientRepository {
  export interface Params {
    name: string;
    email: string;
    phone: string;
  }

  export type Response = Promise<Client>;

  export interface Contract {
    create(
      params: CreateClientRepository.Params
    ): CreateClientRepository.Response;
  }
}
