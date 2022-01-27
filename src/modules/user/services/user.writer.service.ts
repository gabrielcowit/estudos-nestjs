import { SecureService } from '@/core/SecureService';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpTransactionDTO } from '../../auth/dto/signup-transaction.dto';
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

	async create(signUpDTO: SignUpTransactionDTO): Promise<void> {
		try {
			const { username, password, cars } = signUpDTO;
			const passwordHashed = await this.hasherService.generate(password);
			await this.repository.signup({
				username,
				password: passwordHashed,
				cars,
			});
		} catch (error) {
			if (error.code === '23505') {
				throw ExceptionConflictUser();
			}
			throw error;
		}
	}
}
