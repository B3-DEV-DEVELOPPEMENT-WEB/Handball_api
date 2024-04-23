import { Controller, Get, Post, Body, Req, UseGuards } from "@nestjs/common";
import { ActualiteService } from './actualite.service';
import { CreateActualiteDto } from './dto/create-actualite.dto';
import { AuthenticatedRequest } from '../auth/dto/user-login.dto';
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller('actualite')
export class ActualiteController {
  constructor(private readonly actualiteService: ActualiteService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createActualiteDto: CreateActualiteDto, @Req() req: AuthenticatedRequest) {
    const userId = req.user.userId;
    return this.actualiteService.create(createActualiteDto, userId);
  }

  @Get()
  findAll() {
    return this.actualiteService.findAll();
  }
}
