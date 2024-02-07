import {
  LoadClientsUseCase,
} from "@/modules/clients/domain/use-cases";
import { Controller } from "@/shared";
import { ok } from "@/shared/helpers";
import { Http, Validator } from "@/shared/protocols";
import { ZodObjectValidation } from "@/shared/validations";
import {
  LoadClientReqQuery,
  loadClientsControllerValidation,
} from "./load-clients-controller.helpers";
import { clientPrismaRepository } from "@/modules/clients/infra/client-prisma-repository";

type Req = Http.Request<unknown, unknown, LoadClientReqQuery>;

export const makeLoadClientsController = () => {
  class LoadClientController extends Controller<
    unknown,
    unknown,
    LoadClientReqQuery
  > {
    constructor(private readonly useCase: LoadClientsUseCase) {
      super();
    }

    override async perform(httpRequest: Req): Promise<Http.Response<unknown>> {
      const operation = await this.useCase.execute({
        page: httpRequest.query?.page,
        limit: httpRequest.query?.limit,
      });

      return ok(operation.result);
    }

    override buildValidators(httpRequest: Req): Validator[] {
      return [
        new ZodObjectValidation(loadClientsControllerValidation, {
          page: httpRequest.query?.page,
          limit: httpRequest.query?.limit,
        }),
      ];
    }
  }

  const useCase = new LoadClientsUseCase(clientPrismaRepository);
  return new LoadClientController(useCase);
};
