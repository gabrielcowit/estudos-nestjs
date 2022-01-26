import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../user/entity/user.entity';
import { UserRepository } from '../user/repositories/user.repository';
import { IJwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		@InjectRepository(UserRepository)
		private userRepository: UserRepository,
	) {
		super({
			secretOrKey: '007',
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		});
	}

	async validate(payload: IJwtPayload): Promise<User> {
		const { id } = payload;
		const user: User = await this.userRepository.findOne({
			id,
		});

		if (!user) {
			throw new UnauthorizedException();
		}

		return user;
	}
}
