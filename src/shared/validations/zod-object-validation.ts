/* eslint-disable @typescript-eslint/no-explicit-any */
import { ZodError, type ZodObject } from "zod";
import { Validator } from "../protocols/validator";
import { AppError } from "../classes";
import { StatusCodes } from "http-status-codes";

export class ZodObjectValidation implements Validator {
  constructor(
    private readonly schema: ZodObject<any>,
    private readonly input: any
  ) {}

  async validate(): Promise<AppError | undefined> {
    try {
      this.schema.parse(this.input);
      return undefined;
    } catch (error) {
      if (error instanceof ZodError) {
        return new AppError({
          name: "ValidationError",
          code: StatusCodes.BAD_REQUEST,
          message: error.message,
        });
      }

      return new AppError({
        name: "ValidationError",
        code: StatusCodes.BAD_REQUEST,
        message: "Unknown error",
      });
    }
  }
}
