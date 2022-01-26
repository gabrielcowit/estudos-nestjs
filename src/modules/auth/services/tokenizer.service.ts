import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenizerService {
	constructor(private jwtService: JwtService) {}

	async generateToken(value: { id: string }) {
		return this.jwtService.sign(value);
	}
}
