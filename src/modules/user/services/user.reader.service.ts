import { SecureService } from '@/core/SecureService';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDTO } from '../../auth/dto/login.dto';
import { HasherService } from '../../auth/services/hasher.service';
import { User } from '../entity/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { ExceptionLogin } from '@/src/trace/errors/auth';
@Injectable()
export class UserReaderService extends SecureService {
	constructor(
		@InjectRepository(UserRepository)
		private repository: UserRepository,
		private hasherService: HasherService,
	) {
		super();
	}

	async loginOrFail(loginDTO: LoginDTO): Promise<User> {
		const { username, password } = loginDTO;
		const user = await this.repository.findOneByUsername({ username });

		if (
			user &&
			(await this.hasherService.compare(password, user.password))
		) {
			return user;
		}

		throw ExceptionLogin('username/password is wrong');
	}
}
