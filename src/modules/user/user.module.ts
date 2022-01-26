import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HasherService } from '../auth/services/hasher.service';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services';
import { UserReaderService } from './services/user.reader.service';
import { UserWriterService } from './services/user.writer.service';
import { UserController } from './user.controller';
@Module({
	imports: [TypeOrmModule.forFeature([UserRepository])],
	providers: [
		UserService,
		UserWriterService,
		UserReaderService,
		HasherService,
	],
	controllers: [UserController],
	exports: [HasherService, UserWriterService, UserReaderService],
})
export class UserModule {}
