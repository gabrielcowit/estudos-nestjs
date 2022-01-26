import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthenticatorService } from './services';
import { LoginDTO } from './dto/login.dto';
import { SignUpDTO } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthenticatorService) {}

	@Post('/login')
	async login(@Body() loginDTO: LoginDTO): Promise<{ token: string }> {
		return this.authService.login(loginDTO);
	}

	@Post('/signup')
	async createUser(@Body() signUpDTO: SignUpDTO): Promise<void> {
		await this.authService.singup(signUpDTO);
	}
}
