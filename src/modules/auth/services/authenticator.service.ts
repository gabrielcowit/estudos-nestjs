import { SecureService } from '@/core/SecureService';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../../user/repositories/user.repository';
import { UserWriterService } from '../../user/services/user.writer.service';
import { SignUpDTO } from '../dto/signup.dto';
import { ExceptionUntreatedUserCreator } from '@/src/trace/errors/user';
import { LoginDTO } from '../dto/login.dto';
import { UserReaderService } from '../../user/services/user.reader.service';
import { User } from '../../user/entity/user.entity';

@Injectable()
export class AuthenticatorService extends SecureService {
	constructor(
		@InjectRepository(UserRepository)
		private repository: UserRepository,
		private userWriterService: UserWriterService,
		private userReaderService: UserReaderService,
	) {
		super();
	}

	async login(loginDTO: LoginDTO): Promise<User> {
		return this.run(async () => {
			return this.userReaderService.loginOrFail(loginDTO);
		});
	}

	async singup(signUpDTO: SignUpDTO): Promise<void> {
		await this.run(async () => {
			return this.userWriterService.signup(signUpDTO);
		}, ExceptionUntreatedUserCreator);
	}
}
