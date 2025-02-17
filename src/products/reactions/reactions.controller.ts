import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { NATS_SERVICE } from 'src/config/services';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { UpdateReactionDto } from './dto/update-reaction.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { User } from 'src/auth/decorators/user.decorator';
import { CurrentUser } from 'src/auth/interfaces/current-user.interface';

@Controller('reactions')
export class ReactionsController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) {}

  @Get(':id')
  getReviewReactions(
    @Param('id') id: string,
    @Query() paginationDto: PaginationDto
  ) {
    return this.client.send('reactions.get', {
      id,
      paginationDto
    }).pipe(catchError(error => { throw new RpcException(error) }));
  }

  @Post()
  createReaction(
    @Body() createReactionDto: CreateReactionDto
  ) {
    return this.client.send('reactions.create', createReactionDto
    ).pipe(catchError(error => { throw new RpcException(error) }));
  }

  @UseGuards(AuthGuard)
  @Get('/product/:id')
  getUserReactions(
    @Param('productId') productId: string,
    @User() user: CurrentUser
  ) {
    const { id: authorId } = user;
    return this.client.send('reactions.user.get', {
      authorId,
      productId
    }).pipe(catchError(error => { throw new RpcException(error) }));
  }

  

  @Patch(':id')
  updateReaction(
    @Param('id') id: string,
    @Body() updateReactionDto: UpdateReactionDto
  ) {
    return this.client.send('reactions.update', {
      id,
      ...updateReactionDto
    });
  }

  @Delete(':id')
  deleteReaction(
    @Param('id') id: string
  ) {
    return this.client.send('reactions.delete', {
      id
    }).pipe(catchError(error => { throw new RpcException(error) }));
  } 
}
