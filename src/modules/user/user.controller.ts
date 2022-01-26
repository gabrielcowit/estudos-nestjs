import { Body, Get, Param, Post, Controller } from '@nestjs/common';
import { User } from './entity/user.entity';
import { UserReaderService } from './services/user.reader.service';
import { UserWriterService } from './services/user.writer.service';

@Controller('users')
export class UserController {
	constructor(
		private userWriter: UserWriterService,
		private userReader: UserReaderService,
	) {}

	@Get()
	async findAll(): Promise<User[]> {
		return [];
	}

	@Get('/:id')
	async findUser(@Param() id: string): Promise<User> {
		return;
	}
}
