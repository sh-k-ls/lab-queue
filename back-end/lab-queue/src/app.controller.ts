import { Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/guard/local-auth.guard';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { AuthService } from './auth/auth.service';
import { Request } from 'express';
import { UserDto } from './shared/front-back-end/user.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('api/auth/login')
  async login(@Req() req: Request) {
    return this.authService.login(<UserDto>req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('api/v1/profile')
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
