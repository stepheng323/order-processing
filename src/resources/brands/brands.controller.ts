import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { convertResponse } from '../../utils/response';
import { paginateDto } from '../dto/paginate.dto';
import { Response } from 'express';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandService) {}

  @Post()
  async create(
    @Body() createBrandDto: CreateBrandDto,
    @Res() response: Response,
  ) {
    const result = await this.brandsService.create(createBrandDto);
    return convertResponse(response, result);
  }

  @Get()
  async findAll(@Query() query: paginateDto, @Res() response: Response) {
    const result = await this.brandsService.findAll(query);
    return convertResponse(response, result);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() response: Response) {
    const result = await this.brandsService.findOne(id);
    return convertResponse(response, result);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBrandDto: UpdateBrandDto,
    @Res() response: Response,
  ) {
    const result = await this.brandsService.update(id, updateBrandDto);
    return convertResponse(response, result);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() response: Response) {
    const result = await this.brandsService.remove(id);
    return convertResponse(response, result);
  }
}
