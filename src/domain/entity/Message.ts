import { Uuid } from '@/domain/value-object/Uuid';

export class Message {
  constructor(
    public readonly uuid: Uuid,
    public readonly content: string,
  ) { }
}
