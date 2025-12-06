import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCapDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  code: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  friendlyName: string;
}
