import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { NATS_SERVICE } from 'src/config/services';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { catchError } from 'rxjs';


@Controller('products')
export class ProductsController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) { }

  @Get()
  getProducts(
    @Query() paginationDto: PaginationDto
  ) {
    return this.client.send('products.get', paginationDto)
      .pipe(catchError(error => { throw new RpcException(error) }));
  }

  @Get(':id')
  getProductById(
    @Param('id') id: string
  ) {
    return this.client.send('products.get.product', { id })
      .pipe(catchError(error => { throw new RpcException(error) }));
  }

  @Get('/slug/:slug')
  getProductBySlug(
    @Param('slug') slug: string
  ) {
    return this.client.send('products.get.product.slug', { slug })
      .pipe(catchError(error => { throw new RpcException(error) }));
  }

  @Post()
  createProduct(
    @Body() createProductDto: CreateProductDto
  ) {
    return this.client.send('products.create', createProductDto)
      .pipe(catchError(error => { throw new RpcException(error) }));
  }

  @Patch(':id')
  updateProduct(
    @Body() updateProductDto: UpdateProductDto,
    @Param('id') id: string
  ) {
    return this.client.send('products.update', {
      id,
      ...updateProductDto
    }).pipe(catchError(error => { throw new RpcException(error) }));
  }

  @Delete(':id')
  deleteProduct(
    @Param('id') id: string
  ) {
    return this.client.send('products.delete', { id })
      .pipe(catchError(error => { throw new RpcException(error) }))
  }

}
