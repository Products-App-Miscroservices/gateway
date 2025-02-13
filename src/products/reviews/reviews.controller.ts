import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { NATS_SERVICE } from 'src/config/services';
import { CreateReviewDto } from './dto/create-review.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';


@Controller('reviews')
export class ReviewsController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) { }

  @Get(':id')
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

  @Post()
  createReview(
    @Body() createReviewDto: CreateReviewDto
  ) {
    return this.client.send('reviews.create', createReviewDto)
      .pipe(catchError(error => { throw new RpcException(error) }));
  }

  @Patch(':id')
  updateReview() {
    return this.client.send('reviews.update', {})
      .pipe(catchError(error => { throw new RpcException(error) }));
  }

  @Delete(':id')
  deleteReview() {
    return this.client.send('reviews.delete', {})
      .pipe(catchError(error => { throw new RpcException(error) }));
  }
}
