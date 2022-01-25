import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services';
import { AuthenticatorService } from './services/authenticator.service';
import { UserReaderService } from './services/user.reader.service';
import { UserWriterService } from './services/user.writer.service';
import { UserController } from './user.controller';
@Module({
	imports: [TypeOrmModule.forFeature([UserRepository])],
	providers: [
		UserService,
		UserWriterService,
		UserReaderService,
		AuthenticatorService,
	],
	controllers: [UserController],
})
export class UserModule {}
