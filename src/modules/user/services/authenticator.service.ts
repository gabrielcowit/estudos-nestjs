import { SecureService } from '@/core/SecureService';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class AuthenticatorService extends SecureService {
	constructor(
		@InjectRepository(UserRepository)
		private repository: UserRepository,
	) {
		super();
	}
}
