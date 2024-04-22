import { Injectable, ForbiddenException, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';

@Injectable()
export class MatchsService {
  constructor(private prisma: PrismaService) {}

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

  async isUserCoach(userId: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { privilege: true },
    });
    return user?.privilege?.name === 'Coach';
  }

  async isUserPLayer(userId: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { privilege: true },
    });
    return user?.privilege?.name === 'Joueur';
  }

  // inscription
  async addUserToMatch(matchId: string, userId: string) {
    // Vérifiez d'abord si l'utilisateur est un joueur
    const isPlayer = await this.isUserPLayer(userId);
    if (!isPlayer) {
      throw new ForbiddenException('Seuls les joueurs peuvent s’inscrire au match.');
    }

    // Récupérer le match par son id
    const match = await this.prisma.match.findUnique({
      where: { id: matchId },
      include: { participants: true }
    });

    // Vérifier que le match existe
    if (!match) {
      throw new NotFoundException('Match not found');
    }

    // Vérifier si l'utilisateur est déjà dans le match
    const userAlreadyInMatch = match.participants.some((user) => user.id === userId);

    if (userAlreadyInMatch) {
      throw new BadRequestException('L\'utilisateur participe déjà à ce match');
    }

    // Mettre à jour le tableau participants du match pour ajouter l'utilisateur
    return this.prisma.match.update({
      where: { id: matchId },
      data: {
        participants: {
          connect: { id: userId },
        }
      },
      include: { participants: true }  // Inclure les participants dans la réponse
    });
  }

  // désinscription
  async removeUserFromMatch(matchId: string, userId: string) {
    const isPlayer = await this.isUserPLayer(userId);
    if (!isPlayer) {
      throw new ForbiddenException('Seuls les joueurs peuvent se désinscrire du match.');
    }

    const match = await this.prisma.match.findUnique({
      where: { id: matchId },
      include: { participants: true }
    });

    if (!match) {
      throw new NotFoundException('Match not found');
    }

    const userInMatch = match.participants.some((user) => user.id === userId);

    if (!userInMatch) {
      throw new BadRequestException('L\'utilisateur ne participe pas à ce match');
    }

    return this.prisma.match.update({
      where: { id: matchId },
      data: {
        participants: {
          disconnect: { id: userId },
        }
      },
      include: { participants: true }
    });
  }
}
