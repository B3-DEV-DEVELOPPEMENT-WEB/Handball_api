import { IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateMatchDto {
  @IsDateString()
  @IsOptional()
  date?: string;

  @IsString()
  @IsOptional()
  score?: string;
}
