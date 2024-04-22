import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateActualiteDto } from './dto/create-actualite.dto';

@Injectable()
export class ActualiteService {
  constructor(private readonly prisma: PrismaService) {}

  async canUserPostNews(userId: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { privilege: true },
    });
    return user?.privilege?.name === 'Contributeur';
  }

  async create(createActualiteDto: CreateActualiteDto, userId: string) {
    const canPost = await this.canUserPostNews(userId);
    if (!canPost) {
      throw new ForbiddenException('Vous n’avez pas la permission de publier des actualités.');
    }

    const { title, content } = createActualiteDto;

    return this.prisma.actualite.create({
      data: {
        title,
        content,
        authorId: userId,
      },
    });
  }

  async findAll(){
    return this.prisma.actualite.findMany({
      include: { author: true },
    });
  }


}
