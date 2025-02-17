import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products/products.module';
import { ReviewsModule } from './products/reviews/reviews.module';
import { ReactionsModule } from './products/reactions/reactions.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './products/cart/cart.module';

@Module({
  imports: [ProductsModule, ReviewsModule, ReactionsModule, AuthModule, CartModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
