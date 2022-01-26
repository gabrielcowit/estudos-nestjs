import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Vehicle } from '../../vehicle/entity/vehicle.entity';

@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: true })
	username: string;

	@Column()
	password: string;

	@OneToMany((_type) => Vehicle, (vehicle) => vehicle.user, { eager: false })
	vehicles: Vehicle[];
}
