import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { User } from 'src/auth/decorators/user.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CurrentUser } from 'src/auth/interfaces/current-user.interface';
import { NATS_SERVICE } from 'src/config/services';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('cart')
export class CartController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  getUserCart(
    @User() user: CurrentUser
  ) {
    const { id } = user;
    return this.client.send('cart.get.products', {
      userId: id
    })
      .pipe(catchError(error => { throw new RpcException(error )}));
  }

  @UseGuards(AuthGuard)
  @Post()
  createCart(
    @Body() createCartDto: CreateCartDto
  ) {
    return this.client.send('cart.create', createCartDto)
      .pipe(catchError(error => { throw new RpcException(error )}));
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  updateCart(
    @Param('id') id: string,
    @Body() updateCartDto: UpdateCartDto
  ) {
    return this.client.send('cart.update', {
      id,
      ...updateCartDto
    })
      .pipe(catchError(error => { throw new RpcException( error )}));
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteCart(
    @Param('id') id: string
  ) {
    return this.client.send('cart.delete', { id })
      .pipe(catchError(error => { throw new RpcException(error )}));
  }
}
