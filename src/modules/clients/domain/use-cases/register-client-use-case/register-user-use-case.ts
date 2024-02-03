import { UseCase, UseCaseResponse } from "@/shared";
import { CreateClientRepository } from "../../repositories/create-client-repository";
import { Client } from "../../entities/clients";
import { ClientRepository } from "../../repositories";

type Params = CreateClientRepository.Params;
type Result = Client.Model;

export class RegisterClientUseCase extends UseCase<Params, Result> {
  constructor(private readonly clientRepository: ClientRepository) {}

  protected override async perform(
    params: Params
  ): Promise<UseCaseResponse<Result>> {
    const client = await this.clientRepository.create(params);
    return this.casePassed(client);
  }
}
