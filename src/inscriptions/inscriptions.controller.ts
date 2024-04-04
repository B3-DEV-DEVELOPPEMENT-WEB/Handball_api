import { Controller, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { InscriptionsService } from './inscriptions.service';
import { CreateInscriptionDto } from './dto/create-inscription.dto';

@Controller('inscriptions')
export class InscriptionsController {
  constructor(private readonly inscriptionsService: InscriptionsService) {}

  @Post()
  async create(@Body() matchId: string, @Req() req) {
    const token = req.user;
    const userId = token.user.userId;

    const createInscriptionDto: CreateInscriptionDto = {
      matchId: matchId,
      userId: userId
    };

    return this.inscriptionsService.create(createInscriptionDto);
  }

  @Delete(':matchId')
  remove(@Param('matchId') matchId: string, @Req() req) {
    const token = req.user;
    const userId = token.user.userId;

    return this.inscriptionsService.remove(matchId, userId);
  }
}
