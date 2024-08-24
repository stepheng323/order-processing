import { Injectable } from '@nestjs/common';
import { Brand } from '../lib/database';
import { paginateDto } from '../resources/dto/paginate.dto';
import { getPaginationMetadata } from '../utils/pagination';
import { PaginationMetaData } from '../types';

@Injectable()
export class BrandRepo {
  constructor() {}

  async getAllBrands(
    query: paginateDto,
  ): Promise<{ meta: PaginationMetaData; results: Brand[] }> {
    const { page = 1, perPage = 10 } = query;
    const { total, results } = await Brand.query().page(page - 1, perPage);

    const meta = getPaginationMetadata({
      perPage,
      total,
      page,
    });

    return { meta, results };
  }

  async getBrandById(id: string): Promise<Brand> {
    return Brand.query().findById(id);
  }

  async createBrand(data: Partial<Brand>): Promise<Brand> {
    return Brand.query().insertAndFetch(data);
  }

  async updateBrand(id: string, data: Partial<Brand>): Promise<Brand> {
    return Brand.query().patchAndFetchById(id, data);
  }

  async deleteBrand(id: string): Promise<number> {
    return Brand.query().deleteById(id);
  }
}
