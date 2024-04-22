import { Controller, Get, Post, Body, Req, UseGuards } from "@nestjs/common";
import { ActualiteService } from './actualite.service';
import { CreateActualiteDto, RequestWithUser } from "./dto/create-actualite.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller('actualite')
export class ActualiteController {
  constructor(private readonly actualiteService: ActualiteService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createActualiteDto: CreateActualiteDto, @Req() req: RequestWithUser) {
    const userId = req.user.userId;
    return this.actualiteService.create(createActualiteDto, userId);
  }

  @Get()
  findAll() {
    return this.actualiteService.findAll();
  }

}
