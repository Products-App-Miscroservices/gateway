import { Controller, Get, Post, Body, Patch, Param, Inject, ParseUUIDPipe, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config/services';
import { CreateOrderDto } from './dto/create-order.dto';
import { catchError, firstValueFrom } from 'rxjs';
import { OrderPaginationDto } from './dto/order-pagination.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { StatusDto } from './dto/status.dto';


@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) { }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.client.send('orders.create', createOrderDto);
  }

  @Get()
  async findAll(
    @Query() orderPaginationDto: OrderPaginationDto
  ) {
    try {
      return await firstValueFrom(
        this.client.send('orders.find.all', orderPaginationDto)
      )
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get('id/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.client.send('orders.find.one', { id })
      .pipe(catchError(error => { throw new RpcException(error) }));
  }

  @Get(':status')
  async findAllByStatus(
    // Se comenta esa línea ya que si no se dice que 'status' ya es como el objeto StatusDto, lo cual no es cierto.
    //@Param('status') status: StatusDto,
    @Param() statusDto: StatusDto,
    @Query() paginationDto: PaginationDto
  ) {
    return this.client.send('orders.find.all', {
      ...paginationDto,
      status: statusDto.status
    })
      .pipe(catchError(error => { throw new RpcException(error) }));
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto
  ) {
    return this.client.send('orders.change.status', {
      id,
      status: statusDto.status
    }).pipe(catchError(error => { throw new RpcException(error) }));
  }

}
