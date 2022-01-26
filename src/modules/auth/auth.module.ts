import { Module } from '@nestjs/common';
import { AuthenticatorService } from './services/authenticator.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../user/repositories/user.repository';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TokenizerService } from './services/tokenizer.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
	imports: [
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.register({
			secret: '007',
			signOptions: {
				expiresIn: 3600,
			},
		}),
		TypeOrmModule.forFeature([UserRepository]),
		UserModule,
	],
	providers: [AuthenticatorService, TokenizerService, JwtStrategy],
	controllers: [AuthController],
	exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
