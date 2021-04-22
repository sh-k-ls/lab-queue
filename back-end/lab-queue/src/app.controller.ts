import { Controller, Get, Post, UseGuards, Req, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/guard/local-auth.guard';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { AuthService } from './auth/auth.service';
import { Request } from 'express';
import { UserDto } from './shared/front-back-end/user.dto';
import { ProfileDto } from './shared/front-back-end/profile.dto';
import { ProfileService } from './profile/profile.service';
import { JwtDto } from './shared/front-back-end/jwt.dto';

/**
 * Класс AppController
 *
 * Предоставляет API
 */
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly profile: ProfileService,
  ) {}

  /**
   * Отправляет сообщение о работе сервера, если он запущен
   *
   * Сообщение 'Server works...'
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  /**
   * POST-запрос для входа в аккаунт
   *
   *  @param {Request} req Запрос
   *  @returns {string} JSONWebToken
   *  @example {jwt: ukwysx726x2uyxuj2xzywjuxyey}
   */
  @UseGuards(LocalAuthGuard)
  @Post('api/auth/login')
  async login(@Req() req: Request): Promise<JwtDto> {
    return this.authService.login(<UserDto>req.user);
  }

  /**
   * GET-запрос для получения информации об авторизованном пользователе
   *
   *  @param {Request} req Запрос
   *  @returns {string} JSONWebToken
   *  @example {jwt: ukwysx726x2uyxuj2xzywjuxyey}
   */
  @UseGuards(JwtAuthGuard)
  @Get('api/v1/profile')
  getProfile(@Req() req: Request) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('api/v1/user/:id/profile')
  getProfileByUserId(@Param('id') idUser: string): ProfileDto {
    return this.profile.getProfileByUserId(+idUser);
  }
}
