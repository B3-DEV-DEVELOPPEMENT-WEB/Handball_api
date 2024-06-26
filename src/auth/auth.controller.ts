import { Controller, Body, Post, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user-login.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() authLoginDto: UserLoginDto) {
    return this.authService.login(authLoginDto);
  }

  @Post('refresh_token')
  async refreshToken(@Body() body: { refresh_token: string }) {
    const newAccessToken = await this.authService.refreshAccessToken(
      body.refresh_token,
    );
    return { access_token: newAccessToken };
  }
}
