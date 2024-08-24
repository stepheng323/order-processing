import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderLogDto {
  @IsString()
  @IsNotEmpty()
  readonly order_id: string;

  @IsString()
  @IsNotEmpty()
  readonly time: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;
}
