import { IsOptional, IsString, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMatchDto {
  @ApiProperty()
  @IsDateString()
  @IsOptional()
  date?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  score?: string;
}
