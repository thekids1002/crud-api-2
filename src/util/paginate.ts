import { Repository, SelectQueryBuilder, FindManyOptions, ObjectLiteral } from 'typeorm';
import { Request } from 'express';

interface PaginationOptions<T> extends FindManyOptions<T> {
  page?: number;
  limit?: number;
  groupBy?: string; 
  having?: string; 
}

export default interface PaginationResult<T> {
  data: T[];
  total: number;
  currentPage: number;
  lastPage: number;
  perPage: number;
}

export async function paginate<T extends ObjectLiteral>(
  source: Repository<T> | SelectQueryBuilder<T>,
  req: Request,
  options: PaginationOptions<T> = {},
): Promise<PaginationResult<T>> {
  const page = options.page || parseInt(req.query.page as string, 10) || 1;
  const limit = options.limit || parseInt(req.query.limit as string, 10) || 15;
  const skip = (page - 1) * limit;
  
  let data: T[];
  let total: number;

  // Nếu không có groupBy/having và source là Repository thì dùng findAndCount
  if (source instanceof Repository && !options.groupBy && !options.having) {
    [data, total] = await source.findAndCount({
      skip,
      take: limit,
      where: options.where,
      order: options.order,
      select: options.select,
      relations: options.relations,
      withDeleted: options.withDeleted,
    });
  } else {
    // Dùng QueryBuilder cho các truy vấn phức tạp có groupBy/having
    let qb: SelectQueryBuilder<T>;
    if (source instanceof Repository) {
      qb = source.createQueryBuilder('entity');
      
      // Nếu có select, lưu ý rằng kiểu dữ liệu select có thể là mảng hoặc object
      if (options.select) {
        qb.select(options.select as any);
      }
      
      if (options.where) {
        qb.where(options.where);
      }
      
      if (options.order) {
        Object.keys(options.order).forEach((key) => {
          const orderValue = options.order![key];
          const direction = orderValue === -1 ? 'DESC' : 'ASC';
          qb.addOrderBy(`entity.${key}`, direction);
        });
      }
      
      if (options.relations) {
        // Duyệt từng quan hệ để join (ở đây giả định rằng giá trị là true để join và select toàn bộ)
        for (const relation in options.relations) {
          if (options.relations[relation]) {
            qb.leftJoinAndSelect(`entity.${relation}`, relation);
          }
        }
      }
      
      if (options.withDeleted) {
        qb.withDeleted();
      }
      
      if (options.groupBy) {
        qb.groupBy(options.groupBy);
      }
      
      if (options.having) {
        qb.having(options.having);
      }
    } else {
      // Nếu source đã là QueryBuilder
      qb = source;
      if (options.groupBy) {
        qb.groupBy(options.groupBy);
      }
      if (options.having) {
        qb.having(options.having);
      }
    }
    
    // Lấy tổng số bản ghi (lưu ý: khi dùng groupBy, getCount() sẽ trả về số lượng nhóm)
    total = await qb.getCount();
    data = await qb.skip(skip).take(limit).getMany();
  }

  const from = skip + 1;
  const to = from + data.length - 1;

  return {
    data,
    total,
    currentPage: page,
    lastPage: Math.ceil(total / limit),
    perPage: limit
  };
}
