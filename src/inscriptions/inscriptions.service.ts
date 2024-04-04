import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInscriptionDto } from './dto/create-inscription.dto';
import { UpdateInscriptionDto } from './dto/update-inscription.dto';

@Injectable()
export class InscriptionsService {
  constructor(private prisma: PrismaService) {}

  async create(createInscriptionDto: CreateInscriptionDto): Promise<any> {
    return this.prisma.inscription.create({
      data: {
        ...createInscriptionDto,
      },
    });
  }

  async findAll() {
    return this.prisma.inscription.findMany();
  }

  async findOne(id: string) {
    return this.prisma.inscription.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: string, updateInscriptionDto: UpdateInscriptionDto) {
    return this.prisma.inscription.update({
      where: {
        id: id,
      },
      data: updateInscriptionDto,
    });
  }

  async remove(id: string) {
    return this.prisma.inscription.delete({
      where: {
        id: id,
      },
    });
  }
}
