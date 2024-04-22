import { Controller, Post, Body, Put, Param, Req, UseGuards } from "@nestjs/common";
import { MatchsService } from './matchs.service';
import { AuthenticatedRequest, CreateMatchDto } from "./dto/create-match.dto";
import { UpdateMatchDto } from './dto/update-match.dto';
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller('matchs')
export class MatchsController {
  constructor(private readonly matchsService: MatchsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createMatchDto: CreateMatchDto, @Req() req: AuthenticatedRequest) {
    const userId = req.user.userId;
    return this.matchsService.createMatch(createMatchDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateMatchDto: UpdateMatchDto, @Req() req: AuthenticatedRequest) {
    const userId = req.user.userId;
    return this.matchsService.updateMatch(id, updateMatchDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('inscription/:matchId/')
  async addUserToMatch(@Param('matchId') matchId: string, @Req() req: AuthenticatedRequest) {
    const userId = req.user.userId;
    return this.matchsService.addUserToMatch(matchId, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('desinscription/:matchId')
  async removeUserFromMatch(@Param('matchId') matchId: string, @Req() req: AuthenticatedRequest) {
    const userId = req.user.userId;
    return this.matchsService.removeUserFromMatch(matchId, userId);
  }
}
