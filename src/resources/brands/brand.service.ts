import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { IServiceHelper } from '../../types';
import { BrandRepo } from '../../repo/brandRepo';
import { paginateDto } from '../dto/paginate.dto';

@Injectable()
export class BrandService {
  constructor(private brandRepository: BrandRepo) {}
  async create(createBrandDto: CreateBrandDto): Promise<IServiceHelper> {
    const brand = await this.brandRepository.createBrand(createBrandDto);
    return {
      status: 'created',
      message: 'Brand created successfully',
      data: brand,
    };
  }

  async findAll(query: paginateDto): Promise<IServiceHelper> {
    const brands = await this.brandRepository.getAllBrands(query);
    return {
      status: 'successful',
      message: 'Brands fetched successfully',
      data: brands,
    };
  }

  async findOne(id: string): Promise<IServiceHelper> {
    const brand = await this.brandRepository.getBrandById(id);
    if (!brand)
      return {
        status: 'not-found',
        message: 'Brand not found',
      };
    return {
      status: 'successful',
      message: `Brand with ID ${id} found successfully`,
      data: brand,
    };
  }

  async update(
    id: string,
    updateBrandPayload: UpdateBrandDto,
  ): Promise<IServiceHelper> {
    const data = await this.brandRepository.updateBrand(id, updateBrandPayload);
    return {
      status: 'successful',
      message: 'Updated successfully',
      data,
    };
  }

  async remove(id: string): Promise<IServiceHelper> {
    await this.brandRepository.deleteBrand(id);
    return {
      status: 'deleted',
      message: 'Brand deleted successfully',
    };
  }
}
