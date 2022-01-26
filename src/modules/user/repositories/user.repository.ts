import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { SignUpDTO } from '../../auth/dto/signup.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
	async signup({ username, password }): Promise<void> {
		const user = this.create({ username, password });
		await this.save(user);
	}

	async findOneByUsername({ username }): Promise<User> {
		return this.findOne({ username });
	}
}
