import { Controller, Post, Body, Put, Param, Req, ForbiddenException, UseGuards } from "@nestjs/common";
import { MatchsService } from './matchs.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';

import { Request } from 'express';
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

interface AuthenticatedRequest extends Request {
  user: { userId: string };
}


@Controller('matchs')
export class MatchsController {
  constructor(private readonly matchsService: MatchsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createMatchDto: CreateMatchDto, @Req() req: AuthenticatedRequest) {
    const userId = req.user.userId; // Maintenant TypeScript sait que `user` et `id` existent.
    return this.matchsService.createMatch(createMatchDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateMatchDto: UpdateMatchDto, @Req() req: AuthenticatedRequest) {
    const userId = req.user.userId; // Pas besoin du '?' après `user` car TypeScript sait que `user` est défini.
    return this.matchsService.updateMatch(id, updateMatchDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('inscription/:matchId/')
  async addUserToMatch(@Param('matchId') matchId: string, @Req() req: AuthenticatedRequest) {
    const userId = req.user.userId;
    return this.matchsService.addUserToMatch(matchId, userId);
  }
}
