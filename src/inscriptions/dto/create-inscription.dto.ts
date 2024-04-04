import { IsNotEmpty } from 'class-validator';

export class CreateInscriptionDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  matchId: string;
}


