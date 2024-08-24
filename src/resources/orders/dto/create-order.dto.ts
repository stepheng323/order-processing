import {
  IsString,
  IsBoolean,
  IsOptional,
  IsNumber,
  IsArray,
  IsDate,
  IsDateString,
} from 'class-validator';

export class CreateOrderDto {
  @IsString()
  readonly user_id: string;

  @IsBoolean()
  readonly completed: boolean;

  @IsBoolean()
  readonly cancelled: boolean;

  @IsBoolean()
  readonly kitchen_cancelled: boolean;

  @IsBoolean()
  readonly kitchen_accepted: boolean;

  @IsBoolean()
  readonly kitchen_dispatched: boolean;

  @IsOptional()
  @IsDateString()
  readonly kitchen_dispatched_time: string | null;

  @IsOptional()
  @IsDateString()
  readonly completed_time: string | null;

  @IsOptional()
  @IsString()
  readonly rider_id: string | null;

  @IsBoolean()
  readonly kitchen_prepared: boolean;

  @IsBoolean()
  readonly rider_assigned: boolean;

  @IsBoolean()
  readonly paid: boolean;

  @IsString()
  readonly order_code: string;

  @IsString()
  readonly order_change: string;

  @IsString()
  @IsOptional()
  readonly calculated_order_id: string;

  @IsOptional()
  @IsDateString()
  readonly kitchen_verified_time: string;

  @IsOptional()
  @IsDateString()
  readonly kitchen_completed_time: string;

  @IsBoolean()
  readonly shop_accepted: boolean;

  @IsBoolean()
  readonly shop_prepared: boolean;

  @IsNumber()
  readonly no_of_mealbags_delivered: number;

  @IsNumber()
  readonly no_of_drinks_delivered: number;

  @IsOptional()
  @IsDateString()
  readonly rider_started_time: string;

  @IsBoolean()
  readonly rider_started: boolean;

  @IsOptional()
  @IsDateString()
  readonly rider_arrived_time: string;

  @IsBoolean()
  readonly rider_arrived: boolean;

  @IsBoolean()
  readonly is_failed_trip: boolean;

  @IsOptional()
  readonly failed_trip_details: any;

  @IsString()
  readonly box_number: string;

  @IsArray()
  @IsString({ each: true })
  readonly shelf_id: string[];

  @IsBoolean()
  readonly scheduled: boolean;

  @IsOptional()
  @IsString()
  readonly confirmed_by_id: string;

  @IsOptional()
  @IsString()
  readonly completed_by_id: string;

  @IsOptional()
  @IsDate()
  readonly scheduled_delivery_date: Date;

  @IsDateString()
  readonly scheduled_delivery_time: string;

  @IsString()
  readonly order_type_id: string;
}
