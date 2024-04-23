import { ApiProperty } from '@nestjs/swagger';

export class CreateActualiteDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;
}