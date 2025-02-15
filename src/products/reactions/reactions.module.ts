import { Module } from '@nestjs/common';
import { ReactionsController } from './reactions.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [ReactionsController],
  providers: [],
  imports: [NatsModule]
})
export class ReactionsModule {}
