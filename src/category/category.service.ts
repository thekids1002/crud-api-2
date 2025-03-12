import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
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

  /**
   * Xóa danh mục theo ID.
   * @param id - ID của danh mục cần xóa.
   * @returns Kết quả xóa danh mục.
   */
  async remove(id: number): Promise<boolean> {
    try {
      await this.categoryRepository.delete(id);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Tìm kiếm danh mục theo slug.
   * @param slug - Đường dẫn slug của danh mục.
   * @returns Danh mục nếu tìm thấy, ném lỗi NotFoundException nếu không tìm thấy.
   */
  async findBySlug(slug: string): Promise<Category | null> {
    if (!slug || typeof slug !== 'string') {
      throw new BadRequestException('Slug must be a non-empty string.');
    }
    try {
      return await this.categoryRepository.findOneOrFail({
        where: { slug },
        relations: { products: true },
      });
    } catch (error) {
      // Xử lý lỗi nếu không tìm thấy
      throw new NotFoundException(`Category with slug ${slug} not found.`);
    }
  }

  /**
   * Tìm kiếm danh mục theo slug và bao gồm sản phẩm liên quan.
   * @param slug - Đường dẫn slug của danh mục.
   * @returns Danh mục nếu tìm thấy, ngược lại null.
   */
  async findBySlugWithProducts(slug: string): Promise<Category | null> {
    if (!slug || typeof slug !== 'string') {
      throw new BadRequestException('Slug must be a non-empty string.');
    }
    return await this.categoryRepository.findOne({
      where: { slug },
      relations: { products: true },
    });
  }
}
