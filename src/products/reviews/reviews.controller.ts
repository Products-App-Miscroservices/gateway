import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { NATS_SERVICE } from 'src/config/services';
import { CreateReviewDto } from './dto/create-review.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Token } from 'src/auth/decorators/token.decorator';
import { User } from 'src/auth/decorators/user.decorator';
import { CurrentUser } from 'src/auth/interfaces/current-user.interface';


@Controller('reviews')
export class ReviewsController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) { }

  @Get('/product/:id')
  getProductReviews(
    @Param('id') id: string,
    @Query() paginationDto: PaginationDto
  ) {
    return this.client.send('reviews.get', {
      id,
      paginationDto
    })
      .pipe(catchError(error => { throw new RpcException(error) }));
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getProductById(
    @Param('id') productId: string,
    @User() user: CurrentUser
  ) {

    return this.client.send('reviews.get.review', { productId, authorId: user.id })
      .pipe(catchError(error => { throw new RpcException(error) }));
  }

  @Post()
  createReview(
    @Body() createReviewDto: CreateReviewDto
  ) {
    return this.client.send('reviews.create', createReviewDto)
      .pipe(catchError(error => { throw new RpcException(error) }));
  }

  @Patch(':id')
  updateReview(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto
  ) {
    return this.client.send('reviews.update', {
      id,
      ...updateReviewDto
    })
      .pipe(catchError(error => { throw new RpcException(error) }));
  }

  @Delete(':id')
  deleteReview(
    @Param('id') id: string
  ) {
    return this.client.send('reviews.delete', { id })
      .pipe(catchError(error => { throw new RpcException(error) }));
  }
}
