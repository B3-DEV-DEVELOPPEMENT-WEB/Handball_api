import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';

@Injectable()
export class MatchsService {
  constructor(private prisma: PrismaService) {}

  async isUserCoach(userId: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { privilege: true },
    });
    return user?.privilege?.name === 'Coach';
  }

  async createMatch(createMatchDto: CreateMatchDto, userId: string) {
    const isCoach = await this.isUserCoach(userId);
    if (!isCoach) {
      throw new ForbiddenException('Seuls les coaches peuvent créer des matchs.');
    }
    // @ts-ignore
    const { opponent, ...dataWithoutOpponent } = createMatchDto;
    return this.prisma.match.create({
      data: {
        ...dataWithoutOpponent,
        participants: {
          connect: [{ id: userId }],
        },
      },
    });
  }

  async updateMatch(id: string, updateMatchDto: UpdateMatchDto, userId: string) {
    const isCoach = await this.isUserCoach(userId);
    if (!isCoach) {
      throw new ForbiddenException('Seuls les coaches peuvent modifier des matchs.');
    }
    return this.prisma.match.update({
      where: { id },
      data: updateMatchDto,
    });
  }
}
