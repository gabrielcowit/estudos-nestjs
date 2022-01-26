import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entity/user.entity';

@Entity()
export class Vehicle {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	title: string;

	@Column()
	description: string;

	@Column()
	model: string;

	@Column()
	year: number;

	@ManyToOne((_type) => User, (user) => user.vehicles, { eager: false })
	user: User;
}
