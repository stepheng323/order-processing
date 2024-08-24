import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
  IsNumber,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAddonDto } from '../../addons/dto/create-addon.dto';

export class CreateMealDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  readonly amount: number;

  @IsBoolean()
  @IsOptional()
  readonly active?: boolean;

  @IsString()
  @IsNotEmpty()
  readonly brandId: string;

  // @IsArray()
  // @IsOptional()
  // @ValidateNested({ each: true })
  // @Type(() => CreateAddonDto)
  // readonly addons: CreateAddonDto[];
}
