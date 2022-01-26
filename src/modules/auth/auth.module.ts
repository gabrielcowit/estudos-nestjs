import { Module } from '@nestjs/common';
import { AuthenticatorService } from './services/authenticator.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../user/repositories/user.repository';
import { UserModule } from '../user/user.module';

@Module({
	imports: [TypeOrmModule.forFeature([UserRepository]), UserModule],
	providers: [AuthenticatorService],
	controllers: [AuthController],
})
export class AuthModule {}
