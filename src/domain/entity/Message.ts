import { Uuid } from '@/domain/value-object/Uuid';

export class Message {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    public readonly uuid: Uuid,
    public readonly content: string,
  ) { }
}
