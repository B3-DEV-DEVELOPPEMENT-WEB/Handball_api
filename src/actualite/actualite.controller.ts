import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from "@nestjs/common";
import { ActualiteService } from './actualite.service';
import { CreateActualiteDto } from './dto/create-actualite.dto';
import { Request } from 'express';
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

interface RequestWithUser extends Request {
  user: { userId: string };
}

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
