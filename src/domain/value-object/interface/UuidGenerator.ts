import { Uuid } from "../Uuid";

export interface UuidGenerator {
  generate(): Uuid;
}