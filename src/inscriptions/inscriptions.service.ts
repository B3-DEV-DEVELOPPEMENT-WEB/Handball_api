import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInscriptionDto } from './dto/create-inscription.dto';
import { Inscription } from '@prisma/client';

@Injectable()
export class InscriptionsService {
  constructor(private prisma: PrismaService) {}

  async create(createInscriptionDto: CreateInscriptionDto): Promise<Inscription> {
    return this.prisma.inscription.create({
      data: {
        ...createInscriptionDto,
      },
    });
  }

  async remove(matchId: string, userId: string) {
    return this.prisma.inscription.deleteMany({
      where: {
        AND: [
          {
            matchId: matchId,
          },
          {
            userId: userId,
          }
        ]
      },
    });
  }
}
