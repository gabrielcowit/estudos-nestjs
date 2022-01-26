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
import { TokenizerService } from './tokenizer.service';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class AuthenticatorService extends SecureService {
	constructor(
		@InjectRepository(UserRepository)
		private repository: UserRepository,
		private userWriterService: UserWriterService,
		private userReaderService: UserReaderService,
		private tokenizerService: TokenizerService,
	) {
		super();
	}

	async login(loginDTO: LoginDTO): Promise<{ token: string }> {
		return this.run(async () => {
			const user = await this.userReaderService.loginOrFail(loginDTO);
			const { id } = user;
			const payload: IJwtPayload = { id };
			const token = await this.tokenizerService.generateToken(payload);
			return { token };
		});
	}

	async singup(signUpDTO: SignUpDTO): Promise<void> {
		await this.run(async () => {
			return this.userWriterService.signup(signUpDTO);
		}, ExceptionUntreatedUserCreator);
	}
}
