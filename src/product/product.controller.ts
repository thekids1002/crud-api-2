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
import { BadRequestException } from 'src/exception/exceptionParser';

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

 /**
 * Test endpoint to return a hello message.
 * @param id - The ID of the product to test.
 * @returns {Object} A greeting message.
 */
  @Get(':id')
  public test(@Param('id') id: number) {
    if (isNaN(id)) {
        throw new BadRequestException('ID must be a number');
    }
    return { message: "Hello world" };
  }
}
