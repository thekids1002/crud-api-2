import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entity/category.entity';
import PaginationResult, { paginate } from 'src/util/paginate';
import { Repository } from 'typeorm';
import { CreateCategoryRequest } from './payload/request/createCategoryRequest';

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
    try {
      const category = this.categoryRepository.findOneBy({ id });
      if (!category) {
        throw new NotFoundException();
      }
      return category;
    } catch (e) {
      throw e;
    }
  }

  create(category: CreateCategoryRequest): Promise<Category> {
    const newCategory = this.categoryRepository.create(category);
    return this.categoryRepository.save(newCategory);
  }

  async update(id: number, updateCategory: Category): Promise<Category | null> {
    await this.categoryRepository.update(id, updateCategory);
    return this.categoryRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<boolean> {
    try {
      await this.categoryRepository.delete(id);
      return true;
    } catch {
      return false;
    }
  }

  async findBySlug(slug: string): Promise<Category | null> {
    if(!this.isValidSlug(slug)) {
      throw new BadRequestException('Invalid slug');
    }
    const category = await this.categoryRepository.findOneBy({ slug });
    if (!category) {
      throw new NotFoundException(`Category with slug ${slug} not found`);
    }
    return category;
  }

  async findBySlugWithProducts(slug: string): Promise<Category | null> {
    return this.categoryRepository.findOne({
      where: { slug },
      relations: { products: true },
    });
  }

  private isValidSlug(slug: string): boolean {
    return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
  }
}
