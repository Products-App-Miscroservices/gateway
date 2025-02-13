import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products/products.module';
import { ReviewsModule } from './products/reviews/reviews.module';

@Module({
  imports: [ProductsModule, ReviewsModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
