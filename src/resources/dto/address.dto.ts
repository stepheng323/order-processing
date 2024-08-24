import {
  IsString,
  IsNotEmpty,
} from 'class-validator';

export class AddressDetailsDto {
  @IsString()
  @IsNotEmpty()
  readonly city: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly address_line: string;

  @IsString()
  @IsNotEmpty()
  readonly building_number: string;
}
