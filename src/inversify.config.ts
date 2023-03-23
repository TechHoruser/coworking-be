import { Container } from 'inversify';
import { SendMessageController } from '@/infrastructure/user-interface/api/message/SendMessageController';
import { UuidGenerator } from './infrastructure/domain-implementation/UuidGenerator';
import { TYPES } from './infrastructure/domain-implementation/types';

const container = new Container();

container.bind<SendMessageController>(SendMessageController).toSelf();
container.bind<UuidGenerator>(TYPES.UuidGenerator).to(UuidGenerator);

export default container;
