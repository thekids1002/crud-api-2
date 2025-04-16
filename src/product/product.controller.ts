import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll(@Req() req) {
    return this.productService.findAll(req);
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.productService.findById(id);
  }

  @Post()
  create(@Body() product) {
    return this.productService.create(product);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() product) {
    return this.productService.update(id, product);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productService.remove(id);
  }
  
  @Get(':id')
  public test( id: number) {
    return "Hello word";
  }
}
