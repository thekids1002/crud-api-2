import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entity/category.entity';
import { NotFoundException } from 'src/exception/exceptionParser';
import PaginationResult, { paginate } from 'src/util/paginate';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  findAll(req): Promise<PaginationResult<Category>> {
    return paginate(this.categoryRepository, req, {
      relations: {
        products: true,
      },
      select: {
        products: {
          id: true,
          name: true,
        },
      },
    });
  }

  findById(id: number): Promise<Category | null> {
    const category =  this.categoryRepository.findOneBy({ id });
    if(!category){
      throw new NotFoundException('Not Found');
    }
    return category;
  }

  create(category: Category): Promise<Category> {
    const newCategory = this.categoryRepository.create(category);
    return this.categoryRepository.save(newCategory);
  }

  async update(id: number, updateCategory: Category): Promise<Category | null> {
    await this.categoryRepository.update(id, updateCategory);
    return this.categoryRepository.findOneBy({ id });
  }

  remove(id: number): Promise<Boolean> {
    return this.categoryRepository
      .delete(id)
      .then(() => true)
      .catch(() => false);
  }
}
