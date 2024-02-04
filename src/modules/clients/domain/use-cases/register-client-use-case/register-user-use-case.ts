import { UseCase, UseCaseResponse } from "@/shared";
import { ClientRepository } from "../../repositories";
import { Client } from "@prisma/client";

type Params = Omit<Client, "id">;
type Result = Client;

export class RegisterClientUseCase extends UseCase<Params, Result> {
  constructor(private readonly clientRepository: ClientRepository) {
    super();
  }

  protected override async perform(
    params: Params
  ): Promise<UseCaseResponse<Result>> {
    const client = await this.clientRepository.create(params);
    return this.casePassed(client);
  }
}
