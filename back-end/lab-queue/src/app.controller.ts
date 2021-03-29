import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/guard/local-auth.guard';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { AuthService } from './auth/auth.service';

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
	async login(@Request() req) {
		return this.authService.login(req.user);
	}

	@UseGuards(JwtAuthGuard)
	@Get('api/v1/profile')
	getProfile(@Request() req) {
		return req.user;
	}
}
