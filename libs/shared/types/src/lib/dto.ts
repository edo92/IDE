import { IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FormDto {
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsString()
  @IsNotEmpty()
  middleName!: string;

  @IsString()
  @IsNotEmpty()
  street!: string;

  @IsString()
  @IsNotEmpty()
  city!: string;

  @IsNumber()
  @IsNotEmpty()
  zip!: number;

  @IsString()
  @IsIn(['male', 'female'])
  sex!: string;

  @IsString()
  @IsNotEmpty()
  eyeColor!: string;

  @IsString()
  @IsNotEmpty()
  hairColor!: string;

  @IsNumber()
  @IsNotEmpty()
  height!: number;

  @IsNumber()
  @IsNotEmpty()
  weight!: number;

  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @IsNotEmpty()
  dob!: string;

  @IsString()
  @IsNotEmpty()
  doi!: string;

  @IsString()
  @IsNotEmpty()
  doe!: string;

  @IsString()
  @IsNotEmpty()
  directory!: string;
}
