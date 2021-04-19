import { Controller, Get, Post, UseGuards, Req, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/guard/local-auth.guard';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { AuthService } from './auth/auth.service';
import { Request } from 'express';
import { UserDto } from './shared/front-back-end/user.dto';
import { ProfileDto } from './shared/front-back-end/profile.dto';
import { ProfileService } from './profile/profile.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly profile: ProfileService,
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

  @UseGuards(JwtAuthGuard)
  @Get('api/v1/user/:id/profile')
  getProfileByUserId(@Param('id') idUser: string): Promise<ProfileDto[]> {
    return this.profile.getProfileByUserId(+idUser);
  }
}
