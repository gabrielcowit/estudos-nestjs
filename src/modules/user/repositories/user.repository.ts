import { EntityRepository, getManager, Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { SignUpDTO } from '../../auth/dto/signup.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
	async signup({ username, password, cars }): Promise<void> {
		// getManager().transaction((entityManager) => {
		//insercao em varias tabelas nao relacionadas
		// });
		const user = this.create({ username, password, vehicles: cars });
		await this.save(user);
	}

	async findOneByUsername({ username }): Promise<User> {
		return this.findOne({ username });
	}
}
