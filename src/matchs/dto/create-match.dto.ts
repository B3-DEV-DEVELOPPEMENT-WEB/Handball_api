import { ApiProperty } from '@nestjs/swagger';

export class CreateMatchDto {
  @ApiProperty()
  date: string;

  @ApiProperty()
  score?: string;

  @ApiProperty()
  opponent?: string;
}