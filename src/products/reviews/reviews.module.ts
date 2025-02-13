import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [ReviewsController],
  providers: [],
  imports: [NatsModule]
})
export class ReviewsModule { }
