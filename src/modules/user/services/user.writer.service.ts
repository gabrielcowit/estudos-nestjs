import { SecureService } from '@/core/SecureService';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDTO } from '../../auth/dto/signup.dto';
import { UserRepository } from '../repositories/user.repository';
import { ExceptionConflictUser } from '@/src/trace/errors/user';
import { HasherService } from '../../auth/services/hasher.service';
@Injectable()
export class UserWriterService extends SecureService {
	constructor(
		@InjectRepository(UserRepository)
		private repository: UserRepository,
		private hasherService: HasherService,
	) {
		super();
	}

	async signup(signUpDTO: SignUpDTO): Promise<void> {
		try {
			const { username, password } = signUpDTO;
			const passwordHashed = await this.hasherService.generate(password);
			await this.repository.signup({
				username,
				password: passwordHashed,
			});
		} catch (error) {
			if (error.code === '23505') {
				throw ExceptionConflictUser();
			}
			throw error;
		}
	}
}
