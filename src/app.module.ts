import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products/products.module';
import { ReviewsModule } from './products/reviews/reviews.module';
import { ReactionsModule } from './products/reactions/reactions.module';

@Module({
  imports: [ProductsModule, ReviewsModule, ReactionsModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
