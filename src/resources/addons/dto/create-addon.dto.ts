import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateAddonDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  readonly amount: number;

  @IsNumber()
  @IsNotEmpty()
  readonly quantity: number;

  @IsNumber()
  @IsNotEmpty()
  readonly position: number;

  @IsNumber()
  @IsNotEmpty()
  readonly internal_profit: number;

  @IsNumber()
  @IsNotEmpty()
  readonly min_selection_no: string;

  @IsNumber()
  @IsNotEmpty()
  readonly meal_addon_category_id: string;

  @IsBoolean()
  @IsOptional()
  readonly active?: boolean;

  @IsString()
  @IsOptional()
  readonly meal_id: string;

  @IsBoolean()
  @IsOptional()
  readonly is_combo?: boolean;
}
