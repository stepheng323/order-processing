import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandsController } from './brands.controller';

@Module({
  controllers: [BrandsController],
  providers: [BrandService],
})
export class BrandModule {}
