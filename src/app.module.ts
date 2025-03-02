import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products/products.module';
import { ReviewsModule } from './products/reviews/reviews.module';
import { ReactionsModule } from './products/reactions/reactions.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './products/cart/cart.module';
import { OrdersModule } from './orders/orders.module';
import { HealthCheckModule } from './health-check/health-check.module';

@Module({
  imports: [ProductsModule, ReviewsModule, ReactionsModule, AuthModule, CartModule, OrdersModule, HealthCheckModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
