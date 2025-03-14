import { Product } from './../entity/product.entity';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from 'src/exception/exceptionParser';
import PaginationResult, { paginate } from 'src/util/paginate';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  findAll(req): Promise<PaginationResult<Product>> {
    return paginate(this.productRepository, req, {
      relations: {
        category: true,
      },
      select: {
        category: {
          id: true,
          name: true,
        },
      },
    });
  }

  async findById(id: number): Promise<Product | null> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Not Founds');
    }
    return product;
  }

  create(product: Product): Promise<Product> {
    const newProduct = this.productRepository.create(product);
    return this.productRepository.save(newProduct);
  }

  update(id: number, updateProduct: Product): Promise<Product | null> {
    this.productRepository.update(id, updateProduct);
    return this.productRepository.findOneBy({ id });
  }

  remove(id: number): Promise<Boolean> {
    return this.productRepository
      .delete(id)
      .then(() => true)
      .catch(() => false);
  }
}
