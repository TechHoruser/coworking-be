import { UuidGenerator as UuidGeneratorInterface } from '@/domain/value-object/interface/UuidGenerator';
import { Uuid } from '@/domain/value-object/Uuid';
import { injectable } from "inversify";
import { v4 as uuidv4 } from 'uuid';


@injectable()
export class UuidGenerator implements UuidGeneratorInterface
{
  generate(): Uuid
  {
    return new Uuid(uuidv4());
  }
}
