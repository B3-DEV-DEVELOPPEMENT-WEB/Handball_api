import { IsEmail, IsNotEmpty, IsInt, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsInt()
  @IsOptional() // Utilisez IsOptional si le privilegeId peut être omis, sinon retirez cette ligne pour le rendre obligatoire.
  privilegeId: number;
}
