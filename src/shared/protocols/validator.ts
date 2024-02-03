import { AppError } from "../classes";

export interface Validator {
  validate(): Promise<AppError | undefined>;
}
