import { LoadClosestClientsUseCase } from "@/modules/clients/domain/use-cases";
import { Controller } from "@/shared";
import { Http, Validator } from "@/shared/protocols";
import { LoadClosestClientsReqQuery, loadClosestClientsControllerValidation } from "./load-closest-clients-controller.helpers";
import { badRequest, ok } from "@/shared/helpers";
import { clientPrismaRepository } from "@/modules/clients/infra/client-prisma-repository";
import { ZodObjectValidation } from "@/shared/validations";

type Req = Http.Request<any, any, LoadClosestClientsReqQuery, any>;

export const makeLoadClosestClientsController = () => {
  class LoadClosestClientsController extends Controller {
    constructor(private readonly useCase: LoadClosestClientsUseCase) {
      super();
    }

    override async perform(httpRequest: Req): Promise<Http.Response<unknown>> {
      const operation = await this.useCase.execute({
        position_x: httpRequest.query?.position_x,
        position_y: httpRequest.query?.position_y,
      });

      if (operation?.failed) {
        return badRequest(operation.failed);
      }

      return ok(operation.result);
    }

    override buildValidators(httpRequest: Req): Validator[] {
      return [
        new ZodObjectValidation(loadClosestClientsControllerValidation, {
          position_x: httpRequest.query?.position_x,
          position_y: httpRequest.query?.position_y,
        }),
      ];
    }
  }

  const useCase = new LoadClosestClientsUseCase(clientPrismaRepository);
  return new LoadClosestClientsController(useCase);
};
