import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AddressDetailsDto } from '../../dto/address.dto';

export class CreateCalculatedOrderDto {
  @IsString()
  @IsNotEmpty()
  readonly user_id: string;

  @IsString()
  @IsNotEmpty()
  readonly order_id: string;

  @IsString()
  @IsNotEmpty()
  readonly total_amount: number;

  @IsBoolean()
  @IsNotEmpty()
  readonly free_delivery: boolean;

  @IsString()
  @IsNotEmpty()
  readonly delivery_fee: number;

  @IsString()
  @IsNotEmpty()
  readonly service_charge: number;

  @IsString()
  @IsNotEmpty()
  readonly lat: string;

  @IsString()
  @IsNotEmpty()
  readonly lng: string;

  @IsString()
  @IsNotEmpty()
  readonly cokitchen_polygon_id: string;

  @IsString()
  @IsNotEmpty()
  readonly cokitchen_id: string;

  @IsBoolean()
  @IsNotEmpty()
  readonly pickup: boolean;

  @IsString()
  @IsNotEmpty()
  readonly prev_price: number;

  @ValidateNested()
  @Type(() => AddressDetailsDto)
  @IsNotEmpty()
  readonly address_details: AddressDetailsDto;
}
